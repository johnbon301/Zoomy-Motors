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
    const idValue = rowObject[idKey] ?? rowObject.id ?? rowObject.CarID ?? rowObject.CustomerID;

    const normalizeUrl = (base, ep) => {
        const b = (base || '').replace(/\/$/, '');
        const e = ep ? (ep.startsWith('/') ? ep : `/${ep}`) : '';
        return `${b}${e}`;
    };

    // deletion is delegated to `DeleteForm` when used inline

    const handleEdit = (e) => {
        e.preventDefault();
        if (typeof onEdit === 'function') onEdit(rowObject);
    };

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