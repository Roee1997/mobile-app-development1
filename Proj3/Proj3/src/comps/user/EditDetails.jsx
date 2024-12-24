import React, { useState } from "react";


function EditDetails({ currentUser, onUpdateUser, onBackToProfile }) {
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        dateOfBirth: currentUser.dateOfBirth || "",
        city: currentUser.city || "",
        street: currentUser.street || "",
        houseNumber: currentUser.houseNumber || "",
        profileImage: currentUser.profileImage || null, // שמירת התמונה הקיימת
        favoriteGameLink: currentUser.favoriteGameLink || "", // קישור למשחק אהוב
    });

    const [errors, setErrors] = useState({}); // אחסון שגיאות לפי שדה

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profileImage") {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({ ...formData, profileImage: reader.result }); // שמירת התמונה בפורמט Base64
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors = {};

        // בדיקות לכל השדות
        if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName = "שם פרטי חייב להכיל לפחות שני תווים.";
        }
        if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName = "שם משפחה חייב להכיל לפחות שני תווים.";
        }
        if (!formData.username || formData.username.length > 60) {
            newErrors.username = "שם משתמש חייב להיות עד 60 תווים.";
        }
        if (
            !formData.password ||
            formData.password.length < 7 ||
            formData.password.length > 12 ||
            !/[A-Z]/.test(formData.password) ||
            !/\d/.test(formData.password) ||
            !/[@$!%*?&#]/.test(formData.password)
        ) {
            newErrors.password =
                "סיסמה חייבת להיות בין 7 ל-12 תווים, להכיל לפחות אות גדולה, מספר ותו מיוחד.";
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "יש לבחור תאריך לידה.";
        } else {
            const birthYear = new Date(formData.dateOfBirth).getFullYear();
            const currentYear = new Date().getFullYear();
            const age = currentYear - birthYear;
            if (age < 10 || age > 120) {
                newErrors.dateOfBirth = "תאריך הלידה חייב להיות בין גיל 10 ל-120.";
            }
        }
        if (!formData.city) {
            newErrors.city = "חובה להזין ערך לעיר.";
        }
        if (!formData.street) {
            newErrors.street = "חובה להזין ערך לרחוב.";
        }
        if (!formData.houseNumber || formData.houseNumber <= 0) {
            newErrors.houseNumber = "מספר בית חייב להיות מספר חיובי.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setErrors({});
            // עדכון ב-localStorage
            onUpdateUser(formData);

            // עדכון ב-sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(formData));

            alert("הפרטים עודכנו בהצלחה!");
            onBackToProfile(); // חזרה לפרופיל לאחר עדכון
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <h2>עריכת פרטי משתמש</h2>

            <label>שם פרטי:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="הזן שם פרטי"
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
            <br />

            <label>שם משפחה:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="הזן שם משפחה"
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
            <br />

            <label>שם משתמש:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="הזן שם משתמש"
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
            <br />

            <label>סיסמה:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="הזן סיסמה"
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <br />

            <label>אימייל:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
            />
            <br />

            <label>תאריך לידה:</label>
            <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
            />
            {errors.dateOfBirth && <p style={{ color: "red" }}>{errors.dateOfBirth}</p>}
            <br />

            <label>עיר:</label>
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="הזן עיר"
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            <br />

            <label>רחוב:</label>
            <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="הזן רחוב"
            />
            {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
            <br />

            <label>מספר בית:</label>
            <input
                type="number"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="הזן מספר בית"
            />
            {errors.houseNumber && (
                <p style={{ color: "red" }}>{errors.houseNumber}</p>
            )}
            <br />
            <label>קישור למשחק אהוב:</label>
            <input
                type="url"
                name="favoriteGameLink"
                value={formData.favoriteGameLink}
                onChange={handleChange}
                placeholder="הזן קישור למשחק האהוב"
            />
            {errors.favoriteGameLink && (
                <p style={{ color: "red" }}>{errors.favoriteGameLink}</p>
            )}
            <br />
            <br />
                
            <label>תמונת פרופיל:</label>
            <input
                type="file"
                name="profileImage"
                accept="image/jpeg, image/png"
                onChange={handleChange}
            />
            {formData.profileImage && (
                <div>
                    <p>תצוגה מקדימה:</p>
                    <img
                        src={formData.profileImage}
                        alt="תצוגה מקדימה"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}
            <br />
            <button type="submit">עדכון</button>
            <br />
            <button
                type="button"
                onClick={onBackToProfile}
                style={{ marginTop: "10px" }}
            >
                חזרה לפרופיל
            </button>
        </form>
    );
}

export default EditDetails;
