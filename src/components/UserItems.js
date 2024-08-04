import React, { useState, useEffect } from 'react';

const UserItems = () => {
  const [items, setItems] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('https://jello-mmkk.onrender.com/api/items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleRatingChange = (itemId, rating) => {
    setRatings(prevRatings => ({ ...prevRatings, [itemId]: rating }));
  };

  const handleCommentChange = (itemId, comment) => {
    setComments(prevComments => ({ ...prevComments, [itemId]: comment }));
  };

  const submitRatingAndComment = async (itemId) => {
    const response = await fetch(`https://jello-mmkk.onrender.com/api/items/${itemId}/rate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: ratings[itemId],
        comment: comments[itemId],
      }),
    });
    if (response.ok) {
      alert('Rating and comment submitted successfully!');
    } else {
      alert('Error submitting rating and comment.');
    }
  };

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <div>{item.name}</div>
            <div>
              <label>Rating (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={ratings[item._id] || ''}
                onChange={(e) => handleRatingChange(item._id, e.target.value)}
              />
            </div>
            <div>
              <label>Comment:</label>
              <textarea
                value={comments[item._id] || ''}
                onChange={(e) => handleCommentChange(item._id, e.target.value)}
              />
            </div>
            <button onClick={() => submitRatingAndComment(item._id)}>Submit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserItems;
