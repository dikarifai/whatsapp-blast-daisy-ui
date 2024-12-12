interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
  id: string;
}

const ModalComponent: React.FC<ModalProps> = ({ children, onClose, id }) => {
  return (
    <>
      {" "}
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        {children}
      </div>
    </>
  );
};

export default ModalComponent;
