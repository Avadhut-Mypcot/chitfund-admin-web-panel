import React, { useState } from "react";
import ImagePreviewModal from "../components/ImagePreviewModal";
import { isDefaultImage } from "../utils/common";
import type { ImagePreviewComponentProps } from "../types/common.types";

const ImagePreviewComponent: React.FC<ImagePreviewComponentProps> = ({
    imageUrl,
    altText = "Image",
    className = "img-fluid rounded generic-image",
    wrapperClassName = "text-center",
}) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageClick = () => {
        if (!isDefaultImage(imageUrl)) {
            setPreviewImage(imageUrl);
        }
    };

    const shouldShowPreview = !isDefaultImage(imageUrl);

    return (
        <>
            <div className={wrapperClassName}>
                <img
                    src={imageUrl}
                    alt={altText}
                    className={`${className} ${shouldShowPreview ? "cursor-pointer" : ""}`}
                    onClick={handleImageClick}
                    style={{
                        cursor: shouldShowPreview ? "pointer" : "default",
                    }}
                />
            </div>

            <ImagePreviewModal
                isOpen={!!previewImage}
                imageUrl={previewImage || undefined}
                toggle={() => setPreviewImage(null)}
            />
        </>
    );
};

export default ImagePreviewComponent;
