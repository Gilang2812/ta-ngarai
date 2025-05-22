export const createFormData = <T extends { [key: string]: unknown }>(
  data: T
): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "images") {
      if (
        data["images"] &&
        data["images"] instanceof Array &&
        data["images"].length > 0
      ) {
        (data["images"] as (File | Blob)[])?.forEach((image) => {
          if (image instanceof File || image instanceof Blob) {
            formData.append("images", image);
          }
        });
      } else {
        formData.append("images", data["images"] as File | Blob);
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
