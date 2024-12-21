import HeaderComponent from "../headerComponent";
import Sidebar from "../sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-5">
      <Sidebar />
      <div className="col-span-2 xl:col-span-4 flex flex-col relative md:px-8">
        <HeaderComponent />
        {children}
      </div>
    </div>
  );
};

export default LayoutComponent;
