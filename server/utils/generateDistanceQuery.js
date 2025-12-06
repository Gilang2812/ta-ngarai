const tablesWithLocation = [
  "souvenir_place",
  "traditional_house",
  "culinary_place",
  "worship_place",
  "homestay",
  "tourism_village",
  "shipping_address",
];
function formatLocationRow(row) {
  if (!row) return row;

  const location = {
    country: row.country || null,
    province: row.province || null,
    regency: row.regency || null,
    district: row.district || null,
    village: row.village || null,
    postal_code: row.postal_code || null,
  };

  const cleaned = { ...row };

  delete cleaned.country;
  delete cleaned.province;
  delete cleaned.regency;
  delete cleaned.district;
  delete cleaned.village;
  delete cleaned.postal_code;

  return { ...cleaned, location };
}

function formatLocationRows(rows) {
  return rows.map((r) => formatLocationRow(r));
}

function formatLocationRows(rows) {
  return rows.map((r) => formatLocationRow(r));
}

function generateDistanceQuery({ tableName, columns = ["id", "name"] }) {
  let alias = "t";
  let selectedCols = columns.map((col) => `${alias}.${col}`).join(", ");

  const hasLocation = tablesWithLocation.includes(tableName);

  let addressSelect = "";
  let addressJoin = "";

  if (hasLocation) {
    addressSelect = `,
      JSON_OBJECT(
        'country', l.country,
        'province', l.province,
        'regency', l.regency,
        'district', l.district,
        'village', l.village,
        'postal_code', l.postal_code,
        'street', ${alias}.street
      ) AS location
    `;
    addressJoin = `
      LEFT JOIN locations l ON t.id = l.id
    `;
  }

  if (tableName === "facility") {
    return `
      SELECT ${columns.map((c) => `f.${c}`).join(", ")},
        ST_Y(ST_CENTROID(f.geom)) AS lat,
        ST_X(ST_CENTROID(f.geom)) AS lng,
        ft.type AS type,
        (6371 * ACOS(
          COS(RADIANS(:lat)) * COS(RADIANS(ST_Y(ST_CENTROID(f.geom)))) *
          COS(RADIANS(ST_X(ST_CENTROID(f.geom))) - RADIANS(:long)) +
          SIN(RADIANS(:lat)) * SIN(RADIANS(ST_Y(ST_CENTROID(f.geom))))
        )) AS distance
      FROM facility f
      LEFT JOIN facility_type ft ON f.type_id = ft.id
      WHERE f.geom IS NOT NULL
      HAVING distance <= :radiusKm
      ORDER BY distance ASC;
    `;
  }

  return `
    SELECT ${selectedCols},
      ST_Y(ST_CENTROID(t.geom)) AS lat,
      ST_X(ST_CENTROID(t.geom)) AS lng,
      (6371 * ACOS(
        COS(RADIANS(:lat)) * COS(RADIANS(ST_Y(ST_CENTROID(t.geom)))) *
        COS(RADIANS(ST_X(ST_CENTROID(t.geom))) - RADIANS(:long)) +
        SIN(RADIANS(:lat)) * SIN(RADIANS(ST_Y(ST_CENTROID(t.geom))))
      )) AS distance
      ${addressSelect}
    FROM ${tableName} t
    ${addressJoin}
    WHERE t.geom IS NOT NULL
    HAVING distance <= :radiusKm
    ORDER BY distance ASC;
  `;
}

function generateDistanceLessQuery({ tableName, columns = ["id", "name"] }) {
  const alias = "t";
  const selectedCols = columns.map((col) => `${alias}.${col}`).join(", ");
  const hasLocation = tablesWithLocation.includes(tableName);

  let addressSelect = "";
  let addressJoin = "";

  if (hasLocation) {
    addressSelect = `,
      l.country,
      l.province,
      l.regency,
      l.district,
      l.village,
      l.postal_code
    `;
    addressJoin = `
      LEFT JOIN locations l ON t.location_id = l.id
    `;
  }

  // facility special
  if (tableName === "facility") {
    return `
      SELECT ${columns.map((c) => `f.${c}`).join(", ")}, ft.type AS type
      FROM facility f
      LEFT JOIN facility_type ft ON f.type_id = ft.id;
    `;
  }

  return `
    SELECT ${selectedCols}, t.geom
    ${addressSelect}
    FROM ${tableName} t
    ${addressJoin};
  `;
}

module.exports = {
  generateDistanceQuery,
  generateDistanceLessQuery,
  formatLocationRow,
  formatLocationRows,
};
