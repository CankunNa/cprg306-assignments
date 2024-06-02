


import React from 'react';

const Item = ({ name, quantity, category }) => {
  return (
    <li className="p-2 m-4 bg-slate-900 max-w-sm shadow-lg">
      <div>
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <p className="text-sm text-gray-300">Buy {quantity} in {category}</p>
      </div>
    </li>
  );
};

export default Item;
