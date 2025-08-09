import { PackageDay } from "@/type/schema/PackageSchema";

export function findMissingDays(packageDays: PackageDay[]) {
  const dayNumbers = packageDays
    ?.map((d) => parseInt(d.day))
    ?.sort((a, b) => a - b);

  for (let i = 1; i <= dayNumbers.length; i++) {
    if (!dayNumbers.includes(i)) {
      return i;
    }
  }

  // Jika tidak ada yang hilang, kembalikan angka setelahnya
  return dayNumbers.length + 1;
}
