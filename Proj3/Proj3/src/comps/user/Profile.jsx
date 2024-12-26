import React from "react";
import './user.css';

function Profile({ user, onLogout, onEditDetails }) {
    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h2>User Profile</h2>
                    {user.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="Profile Image"
                        />
                    ) : (
                        <p>No profile image available</p>
                    )}
                    <table className="profile-info">
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td>First Name:</td>
                                <td>{user.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>{user.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Date of Birth:</td>
                                <td>{user.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td>{user.city}</td>
                            </tr>
                            <tr>
                                <td>Street:</td>
                                <td>{user.street}</td>
                            </tr>
                            <tr>
                                <td>House Number:</td>
                                <td>{user.houseNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                    {user.favoriteGameLink ? (
                        <button onClick={() => window.open(user.favoriteGameLink, "_blank")}>
                            Favorite Game
                        </button>
                    ) : (
                        <p style={{ color: "gray" }}>No favorite game link provided</p>
                    )}
                    <button onClick={onEditDetails}>Edit Details</button>
                </>
            ) : (
                <p>Please log in to the system</p>
            )}
        </div>
    );
}

export default Profile;
