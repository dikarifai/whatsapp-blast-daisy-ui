interface Columns {
  key: string;
  name: string;
}

interface TableProps {
  columns: any[];
  rows?: any[];
}

const TableComponent: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <div className="overflow-x-auto w-full max-md:w-screen">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {columns.map((column) => (
              <th key={column.key}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th key={column.key}>{column.name}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableComponent;
