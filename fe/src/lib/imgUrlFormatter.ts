import { baseUrl } from "./baseUrl";

export const formatImageUrls = (
  urls: string[]
): { source: string; option: { type: string } }[] => {
  if (!urls || urls.length === 0) {
    return [];
  }
  return urls.map((url) => ({
    source: `${baseUrl}/${url}?v=${new Date().getTime()}`,
    option: {
      type: "local",
    },
  }));
};
