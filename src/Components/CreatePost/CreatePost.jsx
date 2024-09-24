// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../../Authentication/User';
// import { addDoc, collection } from "firebase/firestore";
// import { db } from '../../firebase/firebaseConfig';
// import './CreatePost.css';

// function CreatePost() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const { user } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!user) {
//       console.error("User must be logged in to create a post.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         title,
//         content,
//         username: user.displayName,
//         timestamp: new Date().toISOString()
//       });

//       setTitle('');
//       setContent('');
//       console.log("Post successfully created!");
//     } catch (error) {
//       console.error("Error adding post: ", error);
//     }
//   };

//   return (
//     <div className="create-post">
//       <h2>Create a New Post</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         <textarea placeholder="Post Content" value={content} onChange={(e) => setContent(e.target.value)} required />
//         <button type="submit">Submit Post</button>
//       </form>
//     </div>
//   );
// }

// export default CreatePost;


import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Authentication/User';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User must be logged in to create a post.");
      return;
    }

    try {
      let imageURL = "";

      if (image) {
        // Upload the image to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `post_images/${image.name}`);
        await uploadBytes(storageRef, image);
        imageURL = await getDownloadURL(storageRef);
      }

      // Save the post data along with the image URL (if available)
      await addDoc(collection(db, "posts"), {
        title,
        content,
        username: user.displayName,
        imageUrl: imageURL,  // Save image URL to Firestore
        timestamp: new Date().toISOString(),
      });

      // Clear the form
      setTitle('');
      setContent('');
      setImage(null);

      console.log("Post successfully created!");
      navigate('/home')
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };


  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Post Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        
        {/* Image Upload Input */}
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        
        <button type="submit">Submit Post</button>
      </form>

      {/* Return to Home Button */}
      <button onClick={() => navigate('/home')} style={returnButtonStyles}>
        Return to Home
      </button>

    </div>
  );
}

const returnButtonStyles = {
  marginTop: '15px',
  padding: '10px 15px',
  backgroundColor: '#283593',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default CreatePost;
