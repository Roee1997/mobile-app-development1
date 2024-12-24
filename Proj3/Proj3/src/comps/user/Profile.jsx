import React from "react";

function Profile({ user, onLogout, onEditDetails }) {
    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            {user ? (
                <>
                    <h2>פרופיל משתמש</h2>
                    {/* הצגת תמונת פרופיל */}
                    {user.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="תמונת פרופיל"
                            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                        />
                    ) : (
                        <p>אין תמונת פרופיל</p>
                    )}
                    <p>שם משתמש: {user.username}</p>
                    <p>שם פרטי: {user.firstName}</p>
                    <p>שם משפחה: {user.lastName}</p>
                    <p>אימייל: {user.email}</p>
                    <p>תאריך לידה: {user.dateOfBirth}</p>
                    <p>עיר: {user.city}</p>
                    <p>רחוב: {user.street}</p>
                    <p>מספר בית: {user.houseNumber}</p>
                    {user.favoriteGameLink ? (
                        <button
                            onClick={() => window.open(user.favoriteGameLink, "_blank")}
                            style={{ marginTop: "10px" }}
                        >
                            משחק אהוב
                        </button>
                    ) : (
                        <p style={{ color: "gray" }}>לא הוזן קישור למשחק אהוב</p>
                    )}
                    <br/>
                    <button onClick={onEditDetails} style={{ marginTop: "10px" }}>
                        עריכת פרטים
                    </button>
                    <button
                        onClick={onLogout}
                        style={{ marginLeft: "10px", marginTop: "10px" }}
                    >
                        התנתק
                    </button>

                    <br />
                </>
            ) : (
                <p>יש להתחבר למערכת</p>
            )}
        </div>
    );
}

export default Profile;
