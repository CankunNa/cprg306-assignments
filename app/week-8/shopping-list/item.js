import React from 'react';

const Item = ({ name, quantity, category, onSelect, selected }) => {
  return (
    <li
      className={`p-2 m-4 max-w-sm cursor-pointer ${selected ? 'bg-orange-800' : 'bg-slate-900 hover:bg-orange-800'}`}
      onClick={() => onSelect(name)}
    >
      <div>
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <p className="text-sm text-gray-300">Buy {quantity} in {category}</p>
      </div>
    </li>
  );
};

export default Item;
