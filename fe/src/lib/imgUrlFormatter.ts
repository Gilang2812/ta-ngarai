import { FilepondType } from "@/types/common/FilepondType";
import { baseUrl } from "./baseUrl";

export const formatImageUrls = (
  urls: (string | undefined)[],
  defaultUrl = baseUrl
): FilepondType => {
  if (!urls || urls.length === 0) {
    return [];
  }
  return urls.map((url) => ({
    source: `${defaultUrl}/${url}?v=${new Date().getTime()}`,
    option: {
      type: "local",
    },
  }));
};
