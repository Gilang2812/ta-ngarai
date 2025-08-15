const router = require("express").Router();
const puppeteer = require("puppeteer");
const fs = require("fs");
const dayjs = require("dayjs");
const PdfPrinter = require("pdfmake");
const path = require("path");

const { verifyToken } = require("../middlewares/authentication");
const { getReservationById } = require("../reservation/reservation.service");
const getReservationStatus = require("../../utils/getReservationStatus");
const getInfoTableRow = require("../../utils/getInfoTableRow");
const { getService } = require("../../utils/getService");

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "Roboto-Medium.ttf"),
    italics: path.join(__dirname, "Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "Roboto-MediumItalic.ttf"),
  },
};

const logoBase64 = fs
  .readFileSync("./public/images/kage.png")
  .toString("base64");
const printer = new PdfPrinter(fonts);
const formatPrice = (price) => {
  return `Rp ${price.toLocaleString("id-ID")}`;
};
router.get("/pdfmake/:id", verifyToken, async (req, res) => {
  try {
    const pathUrl = path.join(__dirname, "test");
    console.log("link", pathUrl);
    const { id } = req.params;
    const user = {
      username: req?.user?.username || req?.user?.name || "",
      address: req.user?.address || "(profil is incomplete)",
      phone: req.user?.phone || "(profil is incomplete)",
    };

    const data = await getReservationById(id);
    if (!data) return res.status(404).send("Invoice not found");

    const exclude = getService(data?.package?.detailServices, 0) || [];
    const include = getService(data?.package?.detailServices, 1) || [];
    console.log("data package id", data);
    const detailTableBody = [
      [
        { text: "Date", bold: true },
        { text: "Homestay", bold: true },
        { text: "Unit Name", bold: true },
        { text: "Capacity", bold: true, alignment: "center" },
        { text: "Unit Price", bold: true },
        { text: "Total Price", bold: true },
      ],
    ];

    data.detail.forEach((d) => {
      detailTableBody.push([
        {
          text: dayjs(d.date).format("DD MMMM YYYY"),
          alignment: "center",
        },
        d?.homestay?.homestay?.name ?? "",
        d?.homestay?.unit_name ?? "",
        { text: d?.homestay?.capacity.toString(), alignment: "center" },
        formatPrice(d?.homestay?.price),
        formatPrice(d?.homestay?.price * data?.days_of_stay),
      ]);
    });

    // Tambahkan total & deposit
    detailTableBody.push([
      { text: "Grand Total", colSpan: 5, bold: true },
      {},
      {},
      {},
      {},
      { text: formatPrice(data.total_price), bold: true, alignment: "right" },
    ]);
    detailTableBody.push([
      { text: "Deposit", colSpan: 5, bold: true },
      {},
      {},
      {},
      {},
      { text: formatPrice(data.deposit), bold: true, alignment: "right" },
    ]);

    // 3. Define doc
    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],
      content: [
        // Header
        {
          columns: [
            { image: "logo", width: 50, margin: [0, 0, 30, 0] },
            {
              margin: [30, 0, 0, 0],
              fontSize: 10,
              stack: [
                { text: "Desa Wisata Koto Gadang", bold: true },
                { text: "Koto Gadang village, IV Koto District" },
                { text: "Agam Regency, West Sumatra 26160" },
              ],
            },
          ],
        },
        {
          canvas: [
            { type: "line", x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 },
          ],
        },
        {
          text: "RESERVATION INVOICE",
          style: "header",
          alignment: "right",
          margin: [10, 10],
        },

        // Info pelanggan
        {
          columns: [
            [
              { text: "Kepada Yth.", bold: true },
              `Name: @${user.username}`,
              `Address: ${user.address || "(profil is incomplete)"}`,
              `Phone: ${user.phone || "(profil is incomplete)"}`,
            ],
            [
              `No.Invoice: ${data.id}`,
              `Request at: ${dayjs(data.request_date).format(
                "dddd, D MMMM YYYY HH:mm:ss"
              )}`,
            ],
          ],
          margin: [0, 10],
        },

        // Detail reservasi
        {
          text: "Reservation Detail",
          bold: true,
          margin: [0, 10, 0, 5],
        },
        {
          table: {
            widths: ["auto", "auto", "*"],
            body: [
              [
                "Homestay Name",
                ":",
                data.detail?.[0]?.homestay?.homestay?.name || "-",
              ],
              [
                "Check In",
                ":",
                dayjs(data.check_in).format("dddd, DD MMMM YYYY HH:mm:ss"),
              ],
              [
                "Check Out",
                ":",
                dayjs(data.check_in)
                  .add(data.days_of_stay, "day")
                  .format("dddd, DD MMMM YYYY HH:mm:ss"),
              ],
              ["Day of Stay", ":", `${data.days_of_stay} days`],
              ["Total People", ":", `${data.total_people} people`],
            ],
          },
          layout: "noBorders",
        },

        // Table harga
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto"],
            body: detailTableBody,
          },
          margin: [0, 10],
        },

        // Instruksi pembayaran
        {
          text: "Please make payment via the web application through the Reservation menu → select Reservation ID → click Payment.",
          margin: [0, 10],
        },

        // Status
        {
          table: {
            widths: ["auto", "auto", "*"],
            body: [
              [
                "Confirmation",
                ":",
                data.confirmation_date
                  ? `confirmation on ${dayjs(data.confirmation_date).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}`
                  : "Incomplete",
              ],
              [
                "Deposit Payment",
                ":",
                data.deposit_date
                  ? `complete on ${dayjs(data.deposit_date).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}`
                  : "Incomplete",
              ],
              [
                "Full Payment",
                ":",
                data.payment_date
                  ? `complete on ${dayjs(data.payment_date).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}`
                  : "Incomplete",
              ],
              ["Status", ":", data.status],
            ],
          },
          layout: "noBorders",
          margin: [0, 10],
        },

        // Footer tanda tangan
        {
          columns: [
            { text: "" },
            [
              { text: `Agam, ${dayjs().format("D MMMM YYYY")}` },
              { text: "Best regards,", margin: [0, 20, 0, 0] },
              { text: "Pokdarwis Kage", bold: true, margin: [0, 40, 0, 0] },
            ],
          ],
          margin: [0, 40, 0, 0],
        },
      ],
      images: {
        logo: `data:image/png;base64,${logoBase64}`, // Base64 logo
      },
      styles: {
        header: { fontSize: 12, bold: true },
      },
    };

    // 4. Generate PDF
    const pdfDoc = printer.createPdfKitDocument({
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        fontSize: 10,
        lineHeight: 1.3,
      },
      content: [
        // Header
        {
          columns: [
            { image: "logo", width: 50, margin: [0, 0, 20, 0] },
            {
              margin: [10, 0, 0, 0],
              fontSize: 10,
              stack: [
                { text: "Desa Wisata Koto Gadang", bold: true },
                { text: "Koto Gadang village, IV Koto District" },
                { text: "Agam Regency, West Sumatra 26160" },
              ],
            },
          ],
        },
        {
          canvas: [
            { type: "line", x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 },
          ],
        },
        {
          text: "RESERVATION INVOICE",
          style: "header",
          alignment: "right",
          margin: [10, 10],
        },

        // Info pelanggan
        {
          text: "Kepada Yth.",
        },
        {
          columns: [
            {
              table: {
                widths: ["auto", "auto", "*"],
                body: [
                  getInfoTableRow(`Name`, `@${user.username}`),
                  getInfoTableRow(
                    `Address`,
                    `${user.address || "(profil is incomplete)"}`
                  ),
                  getInfoTableRow(
                    `Phone`,
                    `${user.phone || "(profil is incomplete)"}`
                  ),
                ],
              },
              layout: "noBorders",
            },
            [
              {
                table: {
                  widths: ["auto", "auto", "*"],
                  body: [
                    getInfoTableRow(`No.Invoice`, `${data.id}`),
                    getInfoTableRow(
                      `Request at`,
                      `${dayjs(data.request_date).format(
                        "dddd, D MMMM YYYY HH:mm:ss"
                      )}`
                    ),
                  ],
                },
                layout: "noBorders",
              },
            ],
          ],
          margin: [0, 10],
        },

        // Detail reservasi
        {
          text: "Reservation Detail",
          bold: true,
          margin: [0, 10, 0, 5],
        },
        {
          table: {
            widths: ["auto", "auto", "*"],
            body: [
              getInfoTableRow(
                "Homestay Name",
                data.detail?.[0]?.homestay?.homestay?.name || "-"
              ),
              getInfoTableRow(
                "Check In",
                dayjs(data.check_in).format("dddd, DD MMMM YYYY HH:mm:ss")
              ),
              getInfoTableRow(
                "Check Out",
                dayjs(data.check_in)
                  .add(data.days_of_stay, "day")
                  .format("dddd, DD MMMM YYYY HH:mm:ss")
              ),
              getInfoTableRow("Day of Stay", `${data.days_of_stay} days`),
              getInfoTableRow("Total People", `${data.total_people} people`),
            ],
          },
          layout: "noBorders",
        },

        // Table harga
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto", "auto", "auto"],
            body: detailTableBody,
          },
          margin: [0, 10],
        },
        data.package_id
          ? {
              columns: [
                {
                  columns: [
                    include && {
                      stack: [
                        { text: "service include" },
                        {
                          ol: include.map((item) => item.service.name),
                          margin: [5, 0, 0, 0],
                        },
                      ],
                    },
                    exclude && {
                      stack: [
                        { text: "service exclude" },
                        {
                          ol: exclude.map((item) => item.service.name),
                          margin: [5, 0, 0, 0],
                        },
                      ],
                    },
                  ],
                },
                {
                  text: "",
                },
              ],
            }
          : {},
        // Status
        {
          table: {
            widths: ["auto", "auto", "*"],
            body: [
              getInfoTableRow(
                "Confirmation",
                data.confirmation_date
                  ? `confirmation on ${dayjs(data.confirmation_date).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}`
                  : "Incomplete"
              ),
              getInfoTableRow(
                "Deposit Payment",
                data.deposit_date
                  ? `complete on ${dayjs(data.deposit_date).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}`
                  : "Incomplete"
              ),
              getInfoTableRow(
                "Full Payment",
                data.payment_date
                  ? `complete on ${dayjs(data.payment_date).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}`
                  : "Incomplete"
              ),

              getInfoTableRow(
                "Status",
                getReservationStatus(data).replaceAll("-", " ")
              ),
            ],
          },
          layout: "noBorders",
          margin: [0, 10],
        },

        // Footer tanda tangan
        {
          columns: [
            { text: "", width: "*" },
            {
              width: "auto",
              stack: [
                { text: `Agam, ${dayjs().format("D MMMM YYYY")}` },
                { text: "Best regards,", margin: [0, 20, 0, 0] },
                { text: "Pokdarwis Kage", bold: true, margin: [0, 40, 0, 0] },
              ],
            },
          ],
          margin: [0, 40, 0, 0],
        },
      ],
      images: {
        logo: `data:image/png;base64,${logoBase64}`, // Base64 logo
      },
      styles: {
        header: { fontSize: 12, bold: true },
      },
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${data.id}.pdf`
    );
    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
});

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const user = req.query.user ? JSON.parse(req.query.user) : req.user;
    const url = `${process.env.CLIENT_URL}/invoice/${
      req.params.id
    }?user=${JSON.stringify(user)}`;
    console.log("Generating PDF for URL:", url);
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      Authorization: `Bearer ${req.token}`,
    });
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (error) => console.error("PAGE ERROR:", error));
    page.on("requestfailed", (request) =>
      console.error("REQUEST FAILED:", request.url())
    );
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
      "Content-Length": pdfBuffer.length,
    });
    res.end(pdfBuffer); // GUNAKAN .end() bukan .send() untuk buffer
  } catch (err) {
    res.status(500).send("PDF generation failed: " + err.message);
  }
});

module.exports = router;
