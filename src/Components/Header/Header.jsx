import React, { useContext } from 'react';
import { AuthContext } from '../../Authentication/User';
import { useNavigate } from "react-router-dom";

function Header() {
    const { user, Logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout();
        navigate('/');
    };

    const handleCreatePost = () => {
        navigate('/addPost');
    };

    return (
        <header style={headerStyles}>
            <div style={leftSection}>
                <h1>InterLinked</h1>
            </div>
            <div style={rightSection}>
                <span style={welcomeText}>Welcome, {user ? user.displayName : 'Guest'}</span>
                {user && <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>}
                {user && <button onClick={handleCreatePost} style={createPostButtonStyles}>Create Post</button>}
            </div>
        </header>
    );
}

const headerStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#283593', color: 'white' };
const leftSection = { fontSize: '24px', fontWeight: 'bold' };
const rightSection = { display: 'flex', alignItems: 'center', gap: '15px' };
const welcomeText = { fontSize: '16px', fontWeight: '500' };
const logoutButtonStyles = { padding: '8px 16px', backgroundColor: '#f44336', borderRadius: '5px', color: 'white' };
const createPostButtonStyles = { padding: '8px 16px', backgroundColor: '#4CAF50', borderRadius: '5px', color: 'white' };

export default Header;
