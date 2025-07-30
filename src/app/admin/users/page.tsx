"use client";
import { useState, useEffect } from "react";
import { 
  FaUser, 
  FaTrash, 
  FaEye, 
  FaLock, 
  FaUnlock, 
  FaCrown,
  FaSearch,
  FaFilter,
  FaTimes,
  FaCheck,
  FaExclamationTriangle
} from "react-icons/fa";

interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
  profileCount?: number;
  status: "active" | "suspended" | "pending";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch users");
      } else {
        setUsers(data.users);
      }
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete user");
      } else {
        setUsers(prev => prev.filter(user => user._id !== userId));
        setError("");
      }
    } catch {
      setError("Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  }

  async function toggleUserStatus(userId: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update user status");
      } else {
        setUsers(prev => prev.map(user => 
          user._id === userId ? { ...user, status: newStatus as "active" | "suspended" } : user
        ));
        setError("");
      }
    } catch {
      setError("Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  }

  async function toggleAdminRole(userId: string, currentIsAdmin: boolean) {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentIsAdmin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update user role");
      } else {
        setUsers(prev => prev.map(user => 
          user._id === userId ? { ...user, isAdmin: !currentIsAdmin } : user
        ));
        setError("");
      }
    } catch {
      setError("Failed to update user role");
    } finally {
      setActionLoading(null);
    }
  }

  function openUserModal(user: User) {
    setSelectedUser(user);
    setShowUserModal(true);
  }

  function closeUserModal() {
    setSelectedUser(null);
    setShowUserModal(false);
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || user.status === statusFilter;
    const matchesRole = roleFilter === "" || 
      (roleFilter === "admin" && user.isAdmin) ||
      (roleFilter === "user" && !user.isAdmin);
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "suspended": return "bg-red-100 text-red-800 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <FaCheck className="text-green-600" />;
      case "suspended": return <FaTimes className="text-red-600" />;
      case "pending": return <FaExclamationTriangle className="text-yellow-600" />;
      default: return <FaUser className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
            Manage Users
          </h1>
          <p className="text-green-700 text-sm sm:text-base">
            View and manage all registered users in the system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-green-900">{users.length}</p>
              </div>
              <FaUser className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-900">
                  {users.filter(u => u.status === "active").length}
                </p>
              </div>
              <FaCheck className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-green-900">
                  {users.filter(u => u.isAdmin).length}
                </p>
              </div>
              <FaCrown className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.status === "suspended").length}
                </p>
              </div>
              <FaTimes className="text-red-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setRoleFilter("");
              }}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      {users.length === 0 ? "No users found" : "No users match your search criteria"}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mr-3">
                            <FaUser className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.email}</p>
                            <p className="text-sm text-gray-500">ID: {user._id.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          user.isAdmin 
                            ? "bg-purple-100 text-purple-800 border border-purple-200" 
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}>
                          {user.isAdmin ? <FaCrown className="text-purple-600" /> : <FaUser className="text-gray-600" />}
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openUserModal(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          
                          <button
                            onClick={() => toggleUserStatus(user._id, user.status)}
                            disabled={actionLoading === user._id}
                            className={`p-2 rounded-lg transition-colors ${
                              user.status === "active"
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={user.status === "active" ? "Suspend User" : "Activate User"}
                          >
                            {user.status === "active" ? <FaLock /> : <FaUnlock />}
                          </button>
                          
                          <button
                            onClick={() => toggleAdminRole(user._id, user.isAdmin)}
                            disabled={actionLoading === user._id}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title={user.isAdmin ? "Remove Admin" : "Make Admin"}
                          >
                            <FaCrown />
                          </button>
                          
                          <button
                            onClick={() => deleteUser(user._id)}
                            disabled={actionLoading === user._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">User Details</h2>
              <button
                onClick={closeUserModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedUser.email}</h3>
                  <p className="text-gray-600">ID: {selectedUser._id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedUser.isAdmin 
                          ? "bg-purple-100 text-purple-800 border border-purple-200" 
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}>
                        {selectedUser.isAdmin ? "Admin" : "User"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                    </div>
                    {selectedUser.lastLogin && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Login:</span>
                        <span>{new Date(selectedUser.lastLogin).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleUserStatus(selectedUser._id, selectedUser.status)}
                      className="w-full px-4 py-2 text-sm rounded-lg transition-colors"
                      style={{
                        backgroundColor: selectedUser.status === "active" ? "#fef2f2" : "#f0fdf4",
                        color: selectedUser.status === "active" ? "#dc2626" : "#16a34a",
                        border: `1px solid ${selectedUser.status === "active" ? "#fecaca" : "#bbf7d0"}`
                      }}
                    >
                      {selectedUser.status === "active" ? "Suspend User" : "Activate User"}
                    </button>
                    
                    <button
                      onClick={() => toggleAdminRole(selectedUser._id, selectedUser.isAdmin)}
                      className="w-full px-4 py-2 text-sm bg-purple-100 text-purple-800 border border-purple-200 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      {selectedUser.isAdmin ? "Remove Admin Role" : "Make Admin"}
                    </button>
                    
                    <button
                      onClick={() => {
                        deleteUser(selectedUser._id);
                        closeUserModal();
                      }}
                      className="w-full px-4 py-2 text-sm bg-red-100 text-red-800 border border-red-200 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 