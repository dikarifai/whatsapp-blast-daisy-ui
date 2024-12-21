import { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";

interface CardComponentProps {
  icon: IconType;
  colorIcon?: string;
  count?: number;
}

const CardComponent: React.FC<CardComponentProps> = ({
  icon: Icon,
  colorIcon,
  count,
}) => {
  return (
    <div className="card card-side bg-base-200 shadow-xl justify-center items-center py-4 xl:px-10">
      <i className="px-6">
        <Icon size={64} color={colorIcon || "green"} />
      </i>
      <div className="border-l-2 border-l-black card-body items-center">
        <p className="text-7xl">{count || 0}</p>
      </div>
    </div>
  );
};

export default CardComponent;
