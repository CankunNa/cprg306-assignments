"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    await gitHubSignIn();
  };

  const handleLogout = async () => {
    await firebaseSignOut();
  };

  const goToShoppingList = () => {
    router.push("/week-10/shopping-list");
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen flex flex-col items-center justify-center text-white">
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded">Logout</button>
          <button onClick={goToShoppingList} className="mt-4 bg-green-500 px-4 py-2 rounded">Go to Shopping List</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 rounded">Login with GitHub</button>
      )}
    </div>
  );
};

export default Page;
