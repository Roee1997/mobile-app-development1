import React, { useState } from "react";
import './user.css'

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
        profileImage: currentUser.profileImage || null, // Store the existing image
        favoriteGameLink: currentUser.favoriteGameLink || "", // Link to favorite game
    });

    const [errors, setErrors] = useState({}); // Store validation errors by field

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profileImage") {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({ ...formData, profileImage: reader.result }); // Store the image in Base64 format
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors = {};

        // Validation for all fields
        if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName = "First name must be at least 2 characters.";
        }
        if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters.";
        }
        if (
            !formData.username ||
            formData.username.length > 60 ||
            !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formData.username)
        ) {
            newErrors.username = "Username must be up to 60 characters and can only contain letters, numbers, and special characters.";
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
                "Password must be between 7 and 12 characters, contain at least one uppercase letter, one number, and one special character.";
        }
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
        if (!formData.city) {
            newErrors.city = "City is required.";
        }
        if (!formData.street) {
            newErrors.street = "Street is required.";
        }
        if (!formData.houseNumber || formData.houseNumber <= 0) {
            newErrors.houseNumber = "House number must be a positive number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setErrors({});
            // Update in localStorage
            onUpdateUser(formData);

            // Update in sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(formData));

            alert("Details updated successfully!");
            onBackToProfile(); // Return to profile after update
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <h2>Edit User Details</h2>

            <label>First Name:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
            <br />

            <label>Last Name:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
            <br />

            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
            <br />

            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <br />

            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
            />
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
                placeholder="Enter city"
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            <br />

            <label>Street:</label>
            <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter street"
            />
            {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
            <br />

            <label>House Number:</label>
            <input
                type="number"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="Enter house number"
            />
            {errors.houseNumber && (
                <p style={{ color: "red" }}>{errors.houseNumber}</p>
            )}
            <br />

            <label>Favorite Game Link:</label>
            <input
                type="url"
                name="favoriteGameLink"
                value={formData.favoriteGameLink}
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
            {formData.profileImage && (
                <div>
                    <p>Preview:</p>
                    <img
                        src={formData.profileImage}
                        alt="Preview"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}
            <br />
            <button type="submit">Update</button>
            <br />
            <button
                type="button"
                onClick={onBackToProfile}
                style={{ marginTop: "10px" }}
            >
                Back to Profile
            </button>
        </form>
    );
}

export default EditDetails;
