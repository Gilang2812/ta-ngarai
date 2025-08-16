import { baseUrl } from "@/lib/baseUrl";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useMemo } from "react";
const useFormatImageUrl = (urls: (string | undefined)[]) => {
  const formattedUrl = useMemo(() => {
    return formatImageUrls(urls, baseUrl);
  }, [urls]);
  return formattedUrl;
};

export default useFormatImageUrl;
