import { useAttachmentStore } from "@/stores/attachmentStore";
import { useMemo } from "react";

interface ScaleProps {
    zoom: number;
}

const cmWidthPx = 96 / 2.54;
export function ScaleInfo({ zoom }: ScaleProps) {
    const { lat } = useAttachmentStore()
    const kmPerCm = useMemo(() => getScale(zoom, lat), [zoom, lat]);
    return (
        <div className="flex gap-2 items-center ">
            <div className="flex items-center gap-1.5">
                <div className="h-1 bg-black " style={{ width: cmWidthPx }}></div>
                <span className="text-xs">1 cm</span>
            </div>

            <div>Scale 1 : {parseInt(kmPerCm.toFixed(0)).toLocaleString()}</div>
        </div>

    );
}
function getScale(zoom: number, latitude: number | null) {
    const metersPerPixel =
        (156543.03392 * Math.cos(((latitude ?? 0) * Math.PI) / 180)) /
        Math.pow(2, zoom);

    const metersPerCm = metersPerPixel * cmWidthPx;

    const scale = metersPerCm * 100;

    if (scale > 50000) {
        return Math.round(scale / 100000) * 100000;
    }

    return scale;
}
