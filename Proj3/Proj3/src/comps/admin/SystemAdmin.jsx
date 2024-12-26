import React, { useState } from "react";
import EditDetails from "../user/EditDetails";
import './SystemAdmin.css'

function SystemAdmin({ users, onEditUser, onDeleteUser }) {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    const handleDeleteClick = (email) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            onDeleteUser(email);
        }
    };

    return (
        <div>
            {!selectedUser ? (
                <>
                    <h2>User Management</h2>
                    <table border="1" style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Date of Birth</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Favorite Game</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td>
                                        <img
                                            src={user.profileImage}
                                            alt="Profile Image"
                                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                        />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>{`${user.street}, ${user.city}, ${user.houseNumber}`}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.favoriteGameLink ? (
                                            <button
                                                onClick={() => window.open(user.favoriteGameLink, "_blank")}
                                                style={{ color: "black" }}
                                            >
                                                Game
                                            </button>
                                        ) : (
                                            <p style={{ color: "gray" }}>No Link</p>
                                        )}
                                    </td>

                                    <td>

                                        <button
                                            style={{ marginRight: "5px", color: "blue" }}
                                            onClick={() => handleEditClick(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            style={{ color: "red" }}
                                            onClick={() => handleDeleteClick(user.email)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <EditDetails
                    currentUser={selectedUser}
                    onUpdateUser={(updatedUser) => {
                        onEditUser(updatedUser);
                        setSelectedUser(null);
                    }}
                    onBackToProfile={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}

export default SystemAdmin;
