import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import Form from "./Form";

export default function Navigation() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    console.log("Opening modal");

    setIsOpenModal(true);
    window.history.pushState(null, null, window.location.href);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    window.history.back();
  };

  return (
    <nav className="flex flex-col gap-y-2 navigation text-source-green dark:text-green-100 uppercase font-semibold">
      <button
        onClick={handleOpenModal}
        className="px-2 text-start uppercase rounded transition-all hover:bg-source-green hover:text-green-100"
      >
        Add Places
      </button>

      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <Form onClose={handleCloseModal} />
        </Modal>
      )}

      <NavLink
        to="/results"
        className={({ isActive }) =>
          isActive
            ? "active-link px-2 rounded bg-source-green text-green-100 transition-all"
            : "px-2 rounded hover:bg-source-green hover:text-green-100 transition-all"
        }
      >
        Results
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "active-link px-2 rounded bg-source-green text-green-100 transition-all"
            : "px-2 rounded hover:bg-source-green hover:text-green-100 transition-all"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? "active-link px-2 rounded bg-source-green text-green-100 transition-all"
            : "px-2 rounded hover:bg-source-green hover:text-green-100 transition-all"
        }
      >
        Settings
      </NavLink>
    </nav>
  );
}
