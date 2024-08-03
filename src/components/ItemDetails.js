// src/components/ItemDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`http://localhost:4000/api/items/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setItem(data);
    };
    fetchItem();
  }, [id]);

  const handleComment = async () => {
    const response = await fetch(`http://localhost:4000/api/items/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({ comment }),
    });
    const newComment = await response.json();
    setComments([...comments, newComment]);
  };

  return (
    <div>
      {item && (
        <>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <div>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleComment}>Add Comment</button>
          </div>
          <ul>
            {comments.map((c, index) => (
              <li key={index}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ItemDetails;
