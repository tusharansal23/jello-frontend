import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    alert(localStorage.getItem('token'));
    
    console.log(localStorage.getItem('token'));
    e.preventDefault();
    try {
      const response = await fetch('https://jello-mmkk.onrender.com/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, description, price })
      });

      if (response.ok) {
        navigate('/AdminDashboard');
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add item');
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
