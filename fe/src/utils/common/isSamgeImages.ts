import { FilepondType } from "@/type/common/FilepondType";

export const isSameImages = (
  currentImages: FilepondType,
  initialImages: FilepondType
): boolean => {
  if (currentImages.length !== initialImages.length) return false;

  return currentImages.every((img, i) => {
    const initialImg = initialImages[i];

    // Jika file baru diupload (File object)
    if (img instanceof File || img instanceof Blob) {
      // Cocokkan nama file dengan URL source awal
      return (
        typeof initialImg === "object" &&
        initialImg?.source &&
        typeof initialImg.source === "string" &&
        initialImg.source.includes(String((img as unknown as File).name))
      );
    }

    // Jika masih berbentuk { source, option }, cocokkan source
    if (typeof img === "object" && img?.source && typeof initialImg === "object" && initialImg?.source) {
      return img.source === initialImg.source;
    }

    return false;
  });
};
