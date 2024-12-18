interface HeaderProps {
  title: string;
  name: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderProps> = ({ title, name }) => {
  return (
    <div className="flex flex-col border-b-2 border-slate-400 p-5 text-4xl gap-4">
      <h2 className="text-2xl w-full">
        Welcome <span className="text-cyan-500">{name}</span>
      </h2>
      <div className="flex flex-col">
        {title ? (
          <div>{title}</div>
        ) : (
          <div className="skeleton h-10 w-40"></div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
