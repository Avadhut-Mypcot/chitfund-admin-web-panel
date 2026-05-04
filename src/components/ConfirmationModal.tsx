import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";
import type { ConfirmationModalProps } from "../types/common.types";

const ConfirmationModal = ({
    show,
    description,
    descriptionAddon,
    title,
    btn1Text,
    btn2Text,
    btn1Click,
    btn2Click,
}: ConfirmationModalProps) => {
    const { t } = useTranslation();

    return (
        <Modal fade={true} isOpen={show} toggle={btn1Click} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>{t(title)}</h4>
                        <p className="text-muted mx-4 mb-0">
                            {t(description) + " " + descriptionAddon}
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={btn1Click}
                    >
                        {t(btn1Text)}
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger "
                        id="delete-record"
                        onClick={btn2Click}
                    >
                        {t(btn2Text)}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default React.memo(ConfirmationModal);
