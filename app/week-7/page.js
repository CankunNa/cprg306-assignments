"use client";
import React, { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

const Page = () => {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const handleItemSelect = (name) => {
    const cleanedName = name.split(',')[0].replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g, '').trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-6 bg-slate-950 min-h-screen flex">
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold m-2">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <div className="w-1/2 p-4">
        {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
      </div>
    </main>
  );
};

export default Page;
