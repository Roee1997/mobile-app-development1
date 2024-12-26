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
        profileImage: null, // Field for the profile image
    });

    const [errors, setErrors] = useState({}); // Store validation errors by field

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profileImage" && files && files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profileImage: reader.result }); // Save Base64 image
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors = {};

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
            !formData.password ||
            formData.password.length < 7 ||
            formData.password.length > 12 ||
            !/[A-Z]/.test(formData.password) ||
            !/\d/.test(formData.password) ||
            !/[@$!%*?&#]/.test(formData.password)
        ) {
            newErrors.password =
                "Password must be between 7 and 12 characters, contain at least one uppercase letter, one number, and one special character.";
        }

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // Validate email
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        }

        // Validate first name
        if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName = "First name must be at least 2 characters.";
        }

        // Validate last name
        if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters.";
        }

        // Validate date of birth
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required.";
        } else {
            const birthYear = new Date(formData.dateOfBirth).getFullYear();
            const currentYear = new Date().getFullYear();
            const age = currentYear - birthYear;
            if (age < 10 || age > 120) {
                newErrors.dateOfBirth = "Age must be between 10 and 120.";
            }
        }

        // Validate city
        if (!formData.city) {
            newErrors.city = "City is required.";
        }

        // Validate street
        if (!formData.street) {
            newErrors.street = "Street is required.";
        }

        // Validate house number
        if (!formData.houseNumber || formData.houseNumber <= 0) {
            newErrors.houseNumber = "House number must be a positive number.";
        }

        // Validate profile image
        if (!formData.profileImage) {
            newErrors.profileImage = "Profile image is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Check if all fields are valid
    };

    const saveImageToLocalStorage = (email, imageBase64) => {
        console.log("Saved Image in localStorage:", localStorage.getItem(`${formData.email}_profileImage`));

        return new Promise((resolve, reject) => {
            if (!imageBase64) {
                reject("No image provided");
                return;
            }

            try {
                // Save the image to localStorage
                localStorage.setItem(`${email}_profileImage`, imageBase64);
                resolve(imageBase64); // Return the saved image
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

                // Update user details with the saved image
                onRegister({ ...formData, profileImage: savedImage });
                alert("Registration successful!");
            } catch (error) {
                console.error("Error saving image:", error);
                alert("Error saving the image. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
            <br />

            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <br />

            <label>Confirm Password:</label>
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

            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <br />

            <label>First Name:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
            <br />

            <label>Last Name:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
            <br />

            <label>Date of Birth:</label>
            <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
            />
            {errors.dateOfBirth && <p style={{ color: "red" }}>{errors.dateOfBirth}</p>}
            <br />

            <label>City:</label>
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            <br />

            <label>Street:</label>
            <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
            />
            {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
            <br />

            <label>House Number:</label>
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

            <label>Favorite Game Link:</label>
            <input
                type="url"
                name="favoriteGameLink"
                value={formData.favoriteGameLink || ""}
                onChange={handleChange}
                placeholder="Enter favorite game link"
            />
            {errors.favoriteGameLink && (
                <p style={{ color: "red" }}>{errors.favoriteGameLink}</p>
            )}
            <br />

            <label>Profile Image:</label>
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
                <p style={{ color: "red" }}>Please fix all errors.</p>
            )}

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
