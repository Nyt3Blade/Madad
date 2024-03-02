import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Homepage.css';
import Navbar from './Navbar'
import Model from './Model';
import Model2 from './Model2';

function Homepage() {
  return (
    <div className = 'whole'>
      <Navbar />
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/model" element={<Model />} />
              <Route path="/model2" element={<Model2 />} />
            </Routes>
          </div>
          <div classNAme = 'content'>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
            <h1>text</h1>
          </div>
          {/* Card to navigate to the Model page */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/model" style={{ textDecoration: 'none' }}>
              <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                <h3>Go to Model Page</h3>
              </div>
            </Link>
          </div>
        </Router>
      </div>

    </div>
  )
}

export default Homepage