import React, { useState, useEffect } from "react";
import Login from "./comps/forms/Login";
import Register from "./comps/forms/Register";
import Profile from "./comps/user/Profile";
import EditDetails from "./comps/user/EditDetails";
import SystemAdmin from "./comps/admin/SystemAdmin";
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load the logged-in user's state from sessionStorage when the app loads
  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setCurrentUser(parsedUser);
      setCurrentView(parsedUser.role === "admin" ? "admin" : "profile"); // Navigate to the appropriate page based on the role
    } else {
      setIsLoggedIn(false);
      setCurrentView("login"); // Default to login page
    }
  }, []);

  // Login function
  const handleLogin = (user) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentView(user.role === "admin" ? "admin" : "profile");
  };

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView("login");
  };

  // Navigate to edit details
  const handleEditDetails = () => {
    setCurrentView("editDetails");
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setCurrentUser(updatedUser); // Update the current user
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleBackToProfile = () => {
    setCurrentView("profile");
  };

  const handleRegister = (newUser) => {
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setCurrentView("login");
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>

      {/* Navigation menu */}
      <nav>
        {!isLoggedIn && (
          <>
            <button id="login-button" onClick={() => setCurrentView("login")}>
              Login
            </button>
            <button id="register-button" onClick={() => setCurrentView("register")}>
              Register
            </button>
          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>

      {/* Dynamic display */}
      <div className="dynamic-container">
        {currentView === "login" && <Login onLogin={handleLogin} />}
        {currentView === "register" && <Register onRegister={handleRegister} />}
        {currentView === "profile" && (
          <Profile
            user={currentUser}
            onLogout={handleLogout}
            onEditDetails={handleEditDetails}
          />
        )}
        {currentView === "editDetails" && (
          <EditDetails
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            onBackToProfile={handleBackToProfile}
          />
        )}
        {currentView === "admin" && (
          <SystemAdmin
            users={users}
            onEditUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
