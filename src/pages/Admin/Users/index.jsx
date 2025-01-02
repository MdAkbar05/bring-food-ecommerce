import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../../features/userSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 col-span-1">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users &&
        users?.map((user) => (
          <div key={user._id} className="mb-4">
            <h3 className="text-xl font-semibold mb-1 space-x-2">
              <span>{user.username}</span>
              <span className="text-green-600">({user.role})</span>
            </h3>
            <h3 className="text-xl font-medium text-gray-700 mb-1">
              {user.email}
            </h3>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="bg-red-500 text-white px-2 py-0.5 rounded"
            >
              Delete User
            </button>
          </div>
        ))}
    </div>
  );
};

export default UserManagement;
