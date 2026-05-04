import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import type { ImagePreviewModalProps } from "../types/common.types";

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
    isOpen,
    toggle,
    imageUrl,
    alt = "Preview",
    title = "Image Preview",
}) => {
    if (!imageUrl) return null;

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered
            size="lg"
            backdrop="static"
            className="image-preview-modal"
        >
            <ModalHeader toggle={toggle} className="image-preview-header pb-3">
                {title}
            </ModalHeader>

            <ModalBody className="image-preview-body">
                <div className="image-preview-container">
                    <img src={imageUrl} alt={alt} />
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ImagePreviewModal;
