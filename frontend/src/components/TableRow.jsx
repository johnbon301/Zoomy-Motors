import DeleteForm from './DeleteForm';

const TableRow = ({
    rowObject,
    columns,
    idKey = 'id',
    backendURL = '',
    endpoint = '',
    refresh = () => {},
    onEdit,
    showActions = true,
}) => {
    //Find the primary key value for the row
    // Flexible for common ID field names
    const idValue = rowObject[idKey] ?? rowObject.id ?? rowObject.CarID ?? rowObject.CustomerID;


    // Edit action in th eparent component
    const handleEdit = (e) => {
        e.preventDefault();
        if (typeof onEdit === 'function') onEdit(rowObject);
    };
    // Determine columns to display though if columns is passsed 
    // used them if not default to keys in rowobjects
    const keys = Array.isArray(columns) && columns.length > 0 ? columns : Object.keys(rowObject);

    return (
        <tr>
            {keys.map((k, i) => (
                <td key={i}>{String(rowObject[k] ?? '')}</td>
            ))}

            {showActions && (
                <td>
                    {onEdit && (
                        <button onClick={handleEdit} className="btn-edit">Edit</button>
                    )}
                    <DeleteForm singleId={idValue} endpoint={endpoint} backendURL={backendURL} refresh={refresh} compact={true} />
                </td>
            )}
        </tr>
    );
};

export default TableRow;