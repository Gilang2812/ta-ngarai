function formatImageUrl(url) {
  return url.split("\\").slice(1).join("/").replaceAll(" ", "-");
}

module.exports = { formatImageUrl };
