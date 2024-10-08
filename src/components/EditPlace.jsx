import React, { useState } from "react";
import ModalPlace from "./ModalPlace";
import EditPlaceForm from "./EditPlaceForm";

export default function EditPlace({ children, place }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div onClick={handleOpenModal}>{children}</div>
      {isOpenModal && (
        <ModalPlace onClose={handleCloseModal}>
          <EditPlaceForm onCloseModal={handleCloseModal} placeUpdate={place} />
        </ModalPlace>
      )}
    </div>
  );
}
