import React, { useState } from "react";
import './form.css'

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Validate username
        if (
            !formData.username ||
            formData.username.length > 60 ||
            !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formData.username)
        ) {
            newErrors.username = "Username must contain only alphanumeric characters, special characters, and be no more than 60 characters.";
        }

        // Validate password
        if (
            formData.password !== "ad12343211ad" && // Exception for admin password
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
                "Password must be between 7 and 12 characters, contain at least one uppercase letter, one number, and one special character.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Check if all fields are valid
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        if (!validateForm()) {
            return;
        }

        // Check admin credentials
        if (formData.username === "admin" && formData.password === "ad12343211ad") {
            console.log("Admin login detected");
            const adminUser = {
                username: "admin",
                role: "admin",
            };
            onLogin(adminUser);
            return;
        }

        // Check regular user credentials in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.username === formData.username && u.password === formData.password
        );

        if (user) {
            console.log("Regular user login detected");
            onLogin(user); // Call parent function
        } else {
            console.log("Login failed - incorrect username or password");
            setErrors({ general: "Incorrect username or password." });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                <br />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                <br />

                {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
                <button type="submit">Login</button>
            </form>
        </div>

    );
}

export default Login;
