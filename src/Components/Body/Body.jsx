import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

function Body() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map(doc => ({ 
        id: doc.id, ...doc.data()
      }));

      postsArray.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))

      setPosts(postsArray);
    };

    fetchPosts();
  }, []);

  return (
    <div style={bodyStyles}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={postCardStyles}>
            <div style={postHeaderStyles}>
              <span style={usernameStyles}>{post.username}</span>
              <span style={timestampStyles}>{new Date(post.timestamp).toLocaleString()}</span>
            </div>

            {/* Display image if imageUrl exists */}
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Post" style={postImageStyles} />
            )}

            <div style={postContentStyles}>{post.content}</div>
          </div>
        ))
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  );
}

const bodyStyles = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' };
const postCardStyles = { backgroundColor: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' };
const postHeaderStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#666' };
const usernameStyles = { fontWeight: 'bold', color: '#283593' };
const timestampStyles = { fontSize: '12px', color: '#999' };
const postContentStyles = { fontSize: '16px', color: '#333' };

// Add styles for the image
const postImageStyles = { width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' };

export default Body;
