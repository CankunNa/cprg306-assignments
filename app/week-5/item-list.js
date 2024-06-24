"use client";
import React, { useState } from 'react';
import Item from './item';

const itemList = [
  {
    name: "milk, 4 L 🥛",
    quantity: 1,
    category: "dairy",
  },
  {
    name: "bread 🍞",
    quantity: 2,
    category: "bakery",
  },
  {
    name: "eggs, dozen 🥚",
    quantity: 2,
    category: "dairy",
  },
  {
    name: "bananas 🍌",
    quantity: 6,
    category: "produce",
  },
  {
    name: "broccoli 🥦",
    quantity: 3,
    category: "produce",
  },
  {
    name: "chicken breasts, 1 kg 🍗",
    quantity: 1,
    category: "meat",
  },
  {
    name: "pasta sauce 🍝",
    quantity: 3,
    category: "canned goods",
  },
  {
    name: "spaghetti, 454 g 🍝",
    quantity: 2,
    category: "dry goods",
  },
  {
    name: "toilet paper, 12 pack 🧻",
    quantity: 1,
    category: "household",
  },
  {
    name: "paper towels, 6 pack",
    quantity: 1,
    category: "household",
  },
  {
    name: "dish soap 🍽️",
    quantity: 1,
    category: "household",
  },
  {
    name: "hand soap 🧼",
    quantity: 4,
    category: "household",
  },
];

const ItemList = () => {
  const [sortBy, setSortBy] = useState('name');
  const [groupBy, setGroupBy] = useState(false);

  let sortedItems = [...itemList];

  if (groupBy) {
    const groupedItems = sortedItems.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});

    sortedItems = Object.keys(groupedItems)
      .sort()
      .reduce((acc, category) => {
        groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
        acc.push({ category, items: groupedItems[category] });
        return acc;
      }, []);
  } else {
    sortedItems.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }

  return (
    <div className="max-w-full">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${sortBy === 'name' && !groupBy ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => { setSortBy('name'); setGroupBy(false); }}
        >
          Sort by Name
        </button>
        <button
          className={`px-4 py-2 rounded ${sortBy === 'category' && !groupBy ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => { setSortBy('category'); setGroupBy(false); }}
        >
          Sort by Category
        </button>
        <button
          className={`px-4 py-2 rounded ${groupBy ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setGroupBy(true)}
        >
          Group by Category
        </button>
      </div>
      <ul className="space-y-4">
        {groupBy ? (
          sortedItems.map((group, index) => (
            <div key={index}>
              <h2 className="capitalize font-bold text-lg">{group.category}</h2>
              <ul className="pl-4 space-y-2">
                {group.items.map((item, idx) => (
                  <Item
                    key={idx}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))
        ) : (
          sortedItems.map((item, index) => (
            <Item
              key={index}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
