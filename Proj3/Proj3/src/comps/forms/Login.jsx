import React, { useState } from "react";
import './form.css'

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

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
            formData.password !== "ad12343211ad" && // חריגה עבור סיסמת האדמין
            (
                !formData.password ||
                formData.password.length < 7 ||
                formData.password.length > 12 ||
                !/[A-Z]/.test(formData.password) ||
                !/\d/.test(formData.password) ||
                !/[@$!%*?&#]/.test(formData.password)
            )
        ) {
            newErrors.password =
                "סיסמה חייבת להיות בין 7 ל-12 תווים, להכיל לפחות אות גדולה, מספר ותו מיוחד.";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // האם כל השדות תקינים
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ביצוע ולידציה
        if (!validateForm()) {
            return;
        }

        // בדיקת פרטי אדמין
        if (formData.username === "admin" && formData.password === "ad12343211ad") {
            console.log("Admin login detected");
            const adminUser = {
                username: "admin",
                role: "admin",
            };
            onLogin(adminUser);
            return;
        }

        // בדיקת משתמשים רגילים ב-localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.username === formData.username && u.password === formData.password
        );

        if (user) {
            console.log("Regular user login detected");
            onLogin(user); // קריאה לפונקציה של ההורה
        } else {
            console.log("Login failed - incorrect username or password");
            setErrors({ general: "שם משתמש או סיסמה אינם נכונים." });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>התחברות</h2>

                <label>שם משתמש:</label>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                <br />

                <label>סיסמה:</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                <br />

                {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
                <button type="submit">כניסה</button>
            </form>
        </div>

    );
}

export default Login;
