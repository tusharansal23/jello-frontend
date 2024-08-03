// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import UserItems from './components/UserItems';
import ItemDetails from './components/ItemDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/add-item" element={<AddItem />} />
        <Route path="/admin/edit-item/:id" element={<EditItem />} />        
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/items/:id" element={<ItemDetails/>} />
        <Route path="/" element={<UserItems/>} />
      </Routes>
    </Router>
  );
};

export default App;
