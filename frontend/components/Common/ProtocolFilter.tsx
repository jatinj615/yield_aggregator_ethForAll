export default function ProtocolFilter({ list, selected, handleFilterChange }) {
    const getSelectedStyles = (item: string) => {
        return selected === item ? 'bg-purple-400 text-white' : 'text-gray-400';
    };

    return (
        <div className="flex mt-2">
            <div>
                <ul className="flex cursor-pointer text-xs">
                    {list.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleFilterChange(item)}
                            className={`my-2 py-1 mr-2 px-3 rounded-md ${getSelectedStyles(item)}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
