"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../_utils/auth-context';
import NewItem from './new-item';  
import ItemList from './item-list'; 
import MealIdeas from './meal-ideas';  
import { getItems, addItem } from '../_services/shopping-list-service';

const ShoppingListPage = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/week-10'); 
    } else {
      loadItems();
    }
  }, [user, router]);

  const loadItems = async () => {
    if (user) {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    }
  };

  const handleAddItem = async (newItem) => {
    if (user) {
      const itemId = await addItem(user.uid, newItem);
      setItems([...items, { ...newItem, id: itemId }]);
    }
  };

  const handleItemSelect = (name) => {
    const cleanedName = name.split(',')[0].replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g, '').trim();
    setSelectedItemName(cleanedName);
  };

  if (!user) {
    return null; 
  }

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

export default ShoppingListPage;
