import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:4000/api/items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <button onClick={() => window.location.href = '/admin/add-item'}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description}

            <div>
                <h4>Ratings and Comments:</h4>
                {item.ratings && item.ratings.length > 0 ? (
                  item.ratings.map((entry, index) => (
                    <div key={index}>
                      <p><strong>Rating:</strong> {entry.rating}</p>
                      <p><strong>Comment:</strong> {entry.comment}</p>
                      {/* <p><strong>User:</strong> {entry.user}</p> */}
                    </div>
                  ))
                ) : (
                  <p>No ratings or comments yet.</p>
                )}
              </div>


            <button onClick={() => window.location.href = `/admin/edit-item/${item._id}`}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:4000/api/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      setItems(items.filter(item => item._id !== id));
    } else {
      alert('Failed to delete item');
    }
  }
};

export default AdminDashboard;
