import React, { useState } from "react";
import './form.css'

function Register({ onRegister }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        city: "",
        street: "",
        houseNumber: "",
        profileImage: null, // שדה לתמונה
    });

    const [errors, setErrors] = useState({}); // שגיאות לפי שדה

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profileImage" && files && files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profileImage: reader.result }); // שמירת Base64
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const validateForm = () => {
        let newErrors = {};

        // בדיקת שם משתמש
        if (
            !formData.username ||
            formData.username.length > 60 ||
            !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formData.username)
        ) {
            newErrors.username = "שם משתמש חייב להכיל אותיות לועזיות בלבד, מספרים ותווים מיוחדים, ולא יעלה על 60 תווים.";
        }

        // בדיקת סיסמה
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

        // בדיקת אימות סיסמה
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "סיסמאות אינן תואמות.";
        }

        // בדיקת אימייל
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "אימייל לא תקין.";
        }

        // בדיקת שם פרטי
        if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName = "שם פרטי חייב להכיל לפחות שני תווים.";
        }

        // בדיקת שם משפחה
        if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName = "שם משפחה חייב להכיל לפחות שני תווים.";
        }

        // בדיקת תאריך לידה
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

        // בדיקת עיר
        if (!formData.city) {
            newErrors.city = "חובה להזין ערך לעיר.";
        }

        // בדיקת רחוב
        if (!formData.street) {
            newErrors.street = "חובה להזין ערך לרחוב.";
        }

        // בדיקת מספר בית
        if (!formData.houseNumber || formData.houseNumber <= 0) {
            newErrors.houseNumber = "מספר בית חייב להיות מספר חיובי.";
        }

        // בדיקת תמונה
        if (!formData.profileImage) {
            newErrors.profileImage = "יש להעלות תמונת פרופיל.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // האם כל השדות תקינים
    };
    const saveImageToLocalStorage = (email, imageBase64) => {
        console.log("Saved Image in localStorage:", localStorage.getItem(`${formData.email}_profileImage`));

        return new Promise((resolve, reject) => {
            if (!imageBase64) {
                reject("No image provided");
                return;
            }

            try {
                // שמירת התמונה ב-localStorage
                localStorage.setItem(`${email}_profileImage`, imageBase64);
                resolve(imageBase64); // החזרת התמונה השמורה
            } catch (err) {
                reject("Failed to save the image in localStorage.");
            }
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                let savedImage = null;
                if (formData.profileImage) {
                    savedImage = await saveImageToLocalStorage(formData.email, formData.profileImage);
                }

                // עדכון פרטי המשתמש עם התמונה השמורה
                onRegister({ ...formData, profileImage: savedImage });
                alert("נרשמת בהצלחה!");
            } catch (error) {
                console.error("Error saving image:", error);
                alert("שגיאה בשמירת התמונה. נסה שוב.");
            }
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <h2>הרשמה</h2>
            <label>שם משתמש:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
            <br />

            <label>סיסמה:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <br />

            <label>אימות סיסמה:</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
            <br />

            <label>אימייל:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <br />

            <label>שם פרטי:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
            <br />

            <label>שם משפחה:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
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
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            <br />

            <label>רחוב:</label>
            <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
            />
            {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
            <br />

            <label>מספר בית:</label>
            <input
                type="number"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
            />
            {errors.houseNumber && (
                <p style={{ color: "red" }}>{errors.houseNumber}</p>
            )}
            <br />

            <label>קישור למשחק אהוב:</label>
            <input
                type="url"
                name="favoriteGameLink"
                value={formData.favoriteGameLink || ""}
                onChange={handleChange}
                placeholder="הזן קישור למשחק אהוב"
            />
            {errors.favoriteGameLink && (
                <p style={{ color: "red" }}>{errors.favoriteGameLink}</p>
            )}
            <br />


            <label>תמונת פרופיל:</label>
            <input
                type="file"
                name="profileImage"
                accept="image/jpeg, image/png"
                onChange={handleChange}
            />
            {errors.profileImage && (
                <p style={{ color: "red" }}>{errors.profileImage}</p>
            )}
            <br />

            {Object.keys(errors).length > 0 && (
                <p style={{ color: "red" }}>נא לתקן את כל השגיאות.</p>
            )}

            <button type="submit">הרשמה</button>
        </form>
    );
}

export default Register;
