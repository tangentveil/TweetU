import "./Modal.css";

const Modal = ({ isModalActive }) => {
  return (
    <div
      className={`${
        isModalActive ? "modal-overlay show-modal" : "modal-overlay"
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
