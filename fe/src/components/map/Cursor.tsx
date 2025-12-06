import { useAttachmentStore } from "@/stores/attachmentStore";



export function CursorPosition() {
    const { lat, lng, showCursorPosition } = useAttachmentStore()
    return showCursorPosition && (
        <div className="absolute flex gap-2 items-center  bottom-0 font-normal left-2 bg-white/90 border border-white  p-[1px] rounded-sm text-xs shadow-lg z-10">

            <div>
                {`Lat: ${lat?.toFixed(6) ?? 0}, Lng: ${lng?.toFixed(6) ?? 0}`}
            </div>

        </div>
    );
}