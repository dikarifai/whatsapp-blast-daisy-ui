import { getAccounts } from "@/lib/features/accountsSlice";
import { sendMessage, setSendForm } from "@/lib/features/blastSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

interface SendFormTypes {
  account: string;
  number: string;
  message: string;
}

const useSendMessage = () => {
  const initialSendForm = {
    account: "",
    number: "",
    message: "",
  };
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((item) => item.accounts);
  const blast = useAppSelector((item) => item.blast);
  const sendForm = blast.sendForm;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const form = { ...sendForm, [name]: value };
    dispatch(setSendForm(form));
  };

  const handleSend = async () => {
    dispatch(sendMessage(sendForm));
  };

  useEffect(() => {
    dispatch(getAccounts({ isActive: true }));
  }, []);

  return { accounts, blast, sendForm, handleChange, handleSend };
};

export default useSendMessage;
