"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // 🔥 Fetch users from API
  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setLoadingData(false);
        });
    }
  }, [session]);

  // 🔄 Session loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  // 🔐 RBAC protection
  if (!session || session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Access Denied
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="bg-purple-600 px-4 py-2 rounded">
          {session.user.name}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1f2937] p-5 rounded-xl">
          <p className="text-gray-400">Total Users</p>
          <h2 className="text-2xl font-bold">{users.length}</h2>
        </div>

        <div className="bg-[#1f2937] p-5 rounded-xl">
          <p className="text-gray-400">Admins</p>
          <h2 className="text-2xl font-bold">
            {users.filter(u => u.role === "admin").length}
          </h2>
        </div>

        <div className="bg-[#1f2937] p-5 rounded-xl">
          <p className="text-gray-400">Users</p>
          <h2 className="text-2xl font-bold">
            {users.filter(u => u.role === "user").length}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1f2937] p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">All Users</h2>

        {loadingData ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="pb-2">Email</th>
                <th className="pb-2">Username</th>
                <th className="pb-2">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-800">
                  <td className="py-3">{user.email}</td>
                  <td>{user.username}</td>
                  <td
                    className={
                      user.role === "admin"
                        ? "text-purple-400"
                        : "text-green-400"
                    }
                  >
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}