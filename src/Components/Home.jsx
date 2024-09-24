// src/Home.js

import { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/firebaseConfig.jsx";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/User.jsx";


function Home() {
  const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  const { Logout } = useContext(AuthContext)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser; // Get current user
      if (user) {
        console.log("user: ", user);
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user doc from Firestore
        console.log("userDoc: ", userDoc);
        if (userDoc.exists()) {
          const getData = userDoc.data();
          console.log("getData: ", getData);
          setUserDetails(userDoc.data()); // Set user details from Firestore
          console.log("userDetails: ", userDoc.data()); // Log the fetched user details
        }
      } else {
        navigate("/"); // Redirect to login if not logged in
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Editing user details
  const handleEdit = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        username: newName,
      });
      setUserDetails((prev) => ({ ...prev, username: newName })); // Update local state
      setEditing(false); // Exit edit mode
    }
  };

  const handleLogout = () => {
    Logout()
    navigate('/');
  }

  return (
    <div className="home-container">
      <h2>Welcome {userDetails.username || "Guest"}</h2>{" "}
      {/* Default to "Guest" if no username */}
      <p>Email: {userDetails.email}</p>
      {editing ? (
        <>
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>Edit Name</button>
      )}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
