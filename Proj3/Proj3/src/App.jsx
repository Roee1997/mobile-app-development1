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

  // טען את מצב המשתמש המחובר מ-sessionStorage בעת טעינת האפליקציה
  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setCurrentUser(parsedUser);
      setCurrentView(parsedUser.role === "admin" ? "admin" : "profile"); // מעבר לעמוד בהתאם לתפקיד
    } else {
      setIsLoggedIn(false);
      setCurrentView("login"); // דף התחברות כברירת מחדל
    }
  }, []);

  // התחברות
  const handleLogin = (user) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentView(user.role === "admin" ? "admin" : "profile");
  };

  // התנתקות
  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView("login");
  };

  // ניווט לעריכת פרטים
  const handleEditDetails = () => {
    setCurrentView("editDetails");
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setCurrentUser(updatedUser); // עדכון המשתמש הנוכחי
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

      

      {/* תפריט ניווט */}
      <nav>
        {!isLoggedIn && (
          <>
            <button id="login-button" onClick={() => setCurrentView("login")}>
              התחברות
            </button>
            <button id="register-button" onClick={() => setCurrentView("register")}>
              הרשמה
            </button>

          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout}>התנתק</button>
        )}
      </nav>

      {/* תצוגה דינמית */}
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
