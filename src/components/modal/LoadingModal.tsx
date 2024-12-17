import ModalComponent from "@/components/modal";

const LoadingModal: React.FC = () => {
  return (
    <div className="top-0 left-0 z-[999999] fixed h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  );
};

export default LoadingModal;
