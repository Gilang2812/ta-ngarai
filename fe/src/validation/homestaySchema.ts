export type CreateHomestaySchema = {
    id?:string;
    name:string;
    address:string;
    contact_person?:string;
    description?:string;
    status?:number;
    geom?:Array<string>|string;
    open:`${number}:${number}`|string;
    close:`${number}:${number}`|string;
    homestay_status?:number;
    video_url?:string;
    gallery?:Array<string>|string|null;
    latitude?: string
    longitude?: string
}