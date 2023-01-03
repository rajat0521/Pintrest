import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Component/Login'

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={ <Login />} />
      <Route  path='/*' element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
