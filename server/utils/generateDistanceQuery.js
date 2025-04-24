function generateDistanceQuery({ tableName, columns = ["id", "name"] }) {
  let selectedCols = columns.join(", ");
  if (tableName === "facility") {
     selectedCols = columns.map(col => `f.${col}`).join(", ");

    return `
      SELECT ${selectedCols},f.geom,
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
      SELECT ${selectedCols},geom,
      ST_Y(ST_CENTROID(geom)) AS lat,
      ST_X(ST_CENTROID(geom)) AS lng,
      (6371 * ACOS(
        COS(RADIANS(:lat)) * COS(RADIANS(ST_Y(ST_CENTROID(geom)))) *
        COS(RADIANS(ST_X(ST_CENTROID(geom))) - RADIANS(:long)) +
        SIN(RADIANS(:lat)) * SIN(RADIANS(ST_Y(ST_CENTROID(geom))))
      )) AS distance
      FROM ${tableName}
      WHERE geom IS NOT NULL
      HAVING distance <= :radiusKm
      ORDER BY distance ASC
    `;
}
function generateDistanceLessQuery({ tableName, columns = ["id", "name"] }) {
  let selectedCols = columns.join(", ");
  if (tableName === "facility") {
    selectedCols = columns.map(col => `f.${col}`).join(", ");
    return `
      SELECT ${selectedCols}, f.geom, ft.type AS type
      FROM facility f
      LEFT JOIN facility_type ft ON f.type_id = ft.id;
    `;
  }
  return `
      SELECT ${selectedCols}, geom 
      FROM ${tableName}
    `;
}

module.exports = { generateDistanceQuery, generateDistanceLessQuery };
