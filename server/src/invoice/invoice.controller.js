const router = require("express").Router();
const puppeteer = require("puppeteer");
const fs = require("fs");
const { verifyToken } = require("../middlewares/authentication");
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
