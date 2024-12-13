"use client";
import Image from "next/image";
import TableComponent from "../../../components/tableComponent";
import useAccount from "./useAccount";
import ModalDelete from "./modal/ModalDelete";
import LoadingModal from "@/components/modal/LoadingModal";

export default function Account() {
  const {
    columns,
    rows,
    isShow,
    formData,
    scan,
    dataDelete,
    deleteModal,
    setDeleteModal,
    handleResetScan,
    handleDeleteClick,
    handleChange,
    handleSubmit,
  } = useAccount();

  return (
    <main className="py-8 flex flex-col gap-4 h-full">
      <div>
        <label htmlFor="form-modal" className="btn btn-success text-white">
          Add Account
        </label>
      </div>
      {rows.isLoading ? (
        <div className="skeleton h-96 mr-28"></div>
      ) : (
        <TableComponent columns={columns} rows={rows.data} />
      )}

      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {scan.isLoading ? (
            <h4 className="text-center text-2xl">Loading...</h4>
          ) : scan.data?.qr ? (
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-bold">Scan Here!</h4>
              <Image
                src={scan.data.qr}
                alt="QR Code"
                width={600}
                height={600}
              />
            </div>
          ) : (
            <h4 className="text-2xl font-bold text-center">
              {scan.data?.message}
            </h4>
          )}
        </div>
        <label
          onClick={handleResetScan}
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
          onClick={handleResetScan}
          className="modal-backdrop"
          htmlFor="form-modal"
        >
          Close
        </label>
      </div>
      {rows.isLoadingAction && <LoadingModal />}
      <ModalDelete
        onClick={() => dataDelete?.id && handleDeleteClick(dataDelete?.id)}
        dataDelete={dataDelete}
      />
    </main>
  );
}
