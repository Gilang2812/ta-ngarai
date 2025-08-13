const getService = (detailServices, category) => {
  if (!detailServices || !Array.isArray(detailServices)) return null;
  return (
    detailServices?.filter((service) => service.status === category) ?? null
  );
};

module.exports = { getService };
