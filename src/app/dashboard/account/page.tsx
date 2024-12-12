"use client";
import Image from "next/image";
import TableComponent from "../../../components/tableComponent";
import HeaderComponent from "../../../components/headerComponent";
import useAccount from "./useAccount";

export default function Account() {
  const {
    columns,
    rows,
    isShow,
    qr,
    formData,
    handleSetQr,
    handleChange,
    handleSubmit,
  } = useAccount();

  return (
    <main className="py-8 flex flex-col gap-4 ">
      <div>
        <label htmlFor="form-modal" className="btn btn-success text-white">
          Add Account
        </label>
      </div>
      <TableComponent columns={columns} rows={rows} />

      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {qr && <Image src={qr} alt="QR Code" width={600} height={600} />}
        </div>
        <label
          onClick={() => handleSetQr("")}
          className="modal-backdrop"
          htmlFor="my_modal_7"
        >
          Close
        </label>
      </div>
      <input type="checkbox" id="form-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col items-center gap-4">
          <h4 className="text-xl">Add Account</h4>
          <div className="w-full max-w-xs flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e)}
            />
            <button
              className="btn btn-success text-white"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
        <label
          onClick={() => handleSetQr("")}
          className="modal-backdrop"
          htmlFor="form-modal"
        >
          Close
        </label>
      </div>
    </main>
  );
}
