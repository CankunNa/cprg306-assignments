


import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
    <main className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold m-2">Shopping List</h1>
      <ItemList />
    </main>
  );
};

export default Page;
