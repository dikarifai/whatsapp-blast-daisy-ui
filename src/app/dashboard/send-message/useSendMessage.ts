import { getAccounts } from "@/lib/features/accountsSlice";
import {
  blastMessage,
  sendMessage,
  setSendForm,
} from "@/lib/features/blastSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { textAreaSplitUtil } from "@/utils/textAreaSplitUtil";
import { useEffect, useState } from "react";

const useSendMessage = () => {
  const initialRadio = {};
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((item) => item.accounts);
  const blast = useAppSelector((item) => item.blast);
  const sendForm = blast.sendForm;
  const [radioValue, setRadioValue] = useState<"send" | "blast" | string>(
    "send"
  );

  const radioItems = [
    {
      id: "send",
      name: "Send",
    },
    {
      id: "blast",
      name: "Blast",
    },
  ];

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setRadioValue(value);
  };

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
    radioValue === "send"
      ? dispatch(sendMessage(sendForm))
      : dispatch(blastMessage(sendForm));
  };

  useEffect(() => {
    dispatch(getAccounts({ isActive: true }));
  }, []);

  return {
    accounts,
    blast,
    sendForm,
    radioItems,
    radioValue,
    handleChange,
    handleChangeRadio,
    handleSend,
  };
};

export default useSendMessage;
