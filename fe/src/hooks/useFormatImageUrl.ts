import { baseUrl } from "@/lib/baseUrl";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useMemo } from "react";
const useFormatImageUrl = <T>(urls: (string | undefined)[], deps?: T) => {
  const formattedUrl = useMemo(() => {
    return formatImageUrls(urls, baseUrl);
  }, [urls, deps]);
  return formattedUrl;
};

export default useFormatImageUrl;
