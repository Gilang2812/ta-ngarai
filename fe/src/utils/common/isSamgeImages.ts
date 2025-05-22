export const isSameImages = (
  currentImages: Record<string, unknown>[],
  initialImages: Record<string, unknown>[]
): boolean => {
  if (currentImages.length !== initialImages.length) return false;

  return currentImages.every((img, i) => {
    const initialImg = initialImages[i];

    // Jika file baru diupload (File object)
    if (img instanceof File || img instanceof Blob) {
      // Cocokkan nama file dengan URL source awal
      return typeof initialImg?.source === 'string' && initialImg.source.includes(String((img as unknown as File).name));
    }

    // Jika masih berbentuk { source, option }, cocokkan source
    if (img?.source && initialImg?.source) {
      return img.source === initialImg.source;
    }

    return false;
  });
};
