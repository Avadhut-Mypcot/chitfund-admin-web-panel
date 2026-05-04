import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import { useTranslation } from "react-i18next";
import React from "react";

const DeleteModal = ({
    show,
    onDeleteClick,
    onCloseClick,
}: {
    show: boolean;
    onDeleteClick: () => void;
    onCloseClick: () => void;
}) => {
    const { t } = useTranslation();

    return (
        <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>{t("Are_you_sure")}</h4>
                        <p className="text-muted mx-4 mb-0">
                            {t("Are_you_sure_remove_record")}
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={onCloseClick}
                    >
                        {t("Close")}
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger"
                        id="delete-record"
                        onClick={onDeleteClick}
                    >
                        {t("Yes_Delete_it")}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

DeleteModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default React.memo(DeleteModal);
