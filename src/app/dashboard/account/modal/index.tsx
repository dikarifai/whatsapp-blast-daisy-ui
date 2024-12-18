import ModalComponent from "@/components/modal";
import { AccountTypes } from "@/types/accountTypes";

interface ModalDeleteProps {
  dataDelete: AccountTypes | undefined;
  onClick: () => void;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({
  dataDelete,
  onClick,
}) => {
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

interface ModalAddProps {
  formData: { name: string; phoneNumber: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => Promise<void>;
}

export const ModalAdd: React.FC<ModalAddProps> = ({
  formData,
  onChange,
  handleSubmit,
}) => {
  return (
    <ModalComponent id="form-modal">
      <div className="modal-box flex flex-col items-center gap-4">
        <h4 className="text-xl">Add Account</h4>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => onChange(e)}
          />
          <button className="btn btn-success text-white" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="form-modal">
        Close
      </label>
    </ModalComponent>
  );
};
