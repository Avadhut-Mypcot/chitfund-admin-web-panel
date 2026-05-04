import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Loader from "../components/Loader";
import type { ResetConfirmationModalProps } from "../types/common.types";

const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({
    isOpen,
    onCancel,
    onConfirm,
    title = "Confirm Reset",
    message = "Are you sure you want to reset all fields?",
    confirmText = "Yes, Reset",
    cancelText = "Cancel",
    loading = false,
}) => {
    return (
        <Modal isOpen={isOpen} toggle={onCancel} centered>
            <ModalHeader toggle={onCancel}>{title}</ModalHeader>

            <ModalBody>
                <p>{message}</p>

                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                        className="btn btn-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="btn btn-success d-flex align-items-center gap-2"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? <Loader isButton /> : confirmText}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ResetConfirmationModal;
