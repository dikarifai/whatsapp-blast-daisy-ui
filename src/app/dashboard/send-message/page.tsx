"use client";

import LoadingModal from "@/components/modal/LoadingModal";
import useSendMessage from "./useSendMessage";

const SendMessage: React.FC = () => {
  const { accounts, blast, sendForm, handleChange, handleSend } =
    useSendMessage();

  return (
    <main className="w-full p-4 flex justify-center it">
      <div className="flex flex-col items-center w-full gap-4">
        <h4 className="text-2xl">Send Message</h4>
        <div className="w-full max-w-xl">
          <select
            value={sendForm.account}
            className="select select-bordered w-full max-w-md"
            onChange={(e) => handleChange(e)}
            name="account"
          >
            <option value="" disabled>
              Pick a number for sending
            </option>
            {accounts.data.map((account) => (
              <option key={account.id} value={account.phoneNumber}>
                {`${account.phoneNumber} ${account.name}`}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full max-w-xl ">
          <input
            value={sendForm.number}
            type="text"
            placeholder="Number for sended"
            className="input input-bordered w-full max-w-md"
            name="number"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <textarea
          value={sendForm.message}
          className="textarea textarea-bordered w-full max-w-xl"
          placeholder="Message"
          rows={6}
          onChange={(e) => handleChange(e)}
          name="message"
        ></textarea>
        <button
          onClick={handleSend}
          disabled={!sendForm.message || !sendForm.account || !sendForm.number}
          className="btn btn-success text-white w-full max-w-xl"
        >
          Send
        </button>
      </div>
      {blast.isLoadingAction && <LoadingModal />}
    </main>
  );
};

export default SendMessage;
