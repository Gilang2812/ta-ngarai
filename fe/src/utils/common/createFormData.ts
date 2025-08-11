export const createFormData = <T extends { [key: string]: unknown }>(
  data: T
): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "images" || key === "video_url" || key === "qr_url") {
      if (data[key] && data[key] instanceof Array && data[key].length > 0) {
        (data[key] as (File | Blob)[])?.forEach((image) => {
          if (image instanceof File || image instanceof Blob) {
            formData.append(key, image);
          }
        });
      } else {
        formData.append(key, data[key] as File | Blob);
      }
    } else {
      const value = data[key];
      if (value !== undefined && value !== null && !Array.isArray(value)) {
        formData.append(key, String(value));
      }
    }
  });
  return formData;
};
