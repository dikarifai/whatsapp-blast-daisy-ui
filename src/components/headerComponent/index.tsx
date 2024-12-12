interface HeaderProps {
  title: string;
}

const HeaderComponent: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex flex-col border-b-2 border-slate-400 p-5 text-4xl">
      <div>{title}</div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComponent;
