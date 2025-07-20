"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
        <div>
          Name: <span className="font-bold">{session.user.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session.user.email}</span>
        </div>
        <div>
          User ID: <span className="font-bold">{session.user.id}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}