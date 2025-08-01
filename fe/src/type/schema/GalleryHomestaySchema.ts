export type GalleryHomestaySchema = {
    id: string;
    url: string;
    homestay_id: string;
}

export type UnitGallerySchema =  {
    id: string;
    homestay_id: string;
    unit_type: string;
    unit_number: string;
    url: string;
  }