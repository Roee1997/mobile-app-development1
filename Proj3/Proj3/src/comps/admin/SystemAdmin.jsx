import React, { useState } from "react";
import EditDetails from "../user/EditDetails";
import './SystemAdmin.css'

function SystemAdmin({ users, onEditUser, onDeleteUser }) {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    const handleDeleteClick = (email) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק משתמש זה?")) {
            onDeleteUser(email);
        }
    };

    return (
        <div>
            {!selectedUser ? (
                <>
                    <h2>ניהול משתמשים</h2>
                    <table border="1" style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>תמונה</th>
                                <th>שם משתמש</th>
                                <th>שם מלא</th>
                                <th>תאריך לידה</th>
                                <th>כתובת</th>
                                <th>דוא"ל</th>
                                <th>משחק אהוב</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td>
                                        <img
                                            src={user.profileImage}
                                            alt="תמונת פרופיל"
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
                                                style={{ color: "green" }}
                                            >
                                                משחק
                                            </button>
                                        ) : (
                                            <p style={{ color: "gray" }}>אין קישור</p>
                                        )}
                                    </td>

                                    <td>

                                        <button
                                            style={{ marginRight: "5px", color: "blue" }}
                                            onClick={() => handleEditClick(user)}
                                        >
                                            עריכה
                                        </button>
                                        <button
                                            style={{ color: "red" }}
                                            onClick={() => handleDeleteClick(user.email)}
                                        >
                                            מחיקה
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
