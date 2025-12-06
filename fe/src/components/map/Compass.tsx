import { useAttachmentStore } from "@/stores/attachmentStore";
import Image from "next/image";

export const Compass = () => {
    const { showCompass } = useAttachmentStore();
    return showCompass && (
        <Image
            alt="compass"
            src="/images/compass.png"
            width={60}
            height={60}
            className="absolute top-14  left-3 bg-white/50 border border-white rounded-sm w-15 z-10 transition-all duration-200"
        />
    );
}
