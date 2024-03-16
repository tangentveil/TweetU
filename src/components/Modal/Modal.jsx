import "./Modal.css";

const Modal = ({ isModalOpen }) => {
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <p>Edit</p>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default Modal;
