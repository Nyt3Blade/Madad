import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Model from './Model';
import Homepage from './Homepage';
import Model2 from './Model2';

function App() {

  return (
    <div>
      <Homepage />
    </div>
  )
}

export default App