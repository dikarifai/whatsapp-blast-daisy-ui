import ModalComponent from "@/components/modal";
import { AccountTypes } from "@/types/accountTypes";

interface ModalProps {
  dataDelete: AccountTypes | undefined;
  onClick: () => void;
}

const ModalDelete: React.FC<ModalProps> = ({ dataDelete, onClick }) => {
  return (
    <ModalComponent id="delete-modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Delete</h3>
        <p className="py-4">
          Are you sure to delete an account in {dataDelete?.name} name with a
          phone number {dataDelete?.phoneNumber}?
        </p>
        <div className="modal-action">
          <label onClick={onClick} className="btn bg-red-600 text-white">
            Delete
          </label>
          <label htmlFor="delete-modal" className="btn">
            Cancel
          </label>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="delete-modal">
        Close
      </label>
    </ModalComponent>
  );
};

export default ModalDelete;
