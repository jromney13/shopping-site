import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home/Home.js'
import Menu from './Pages/Menu/Menu.js'
import Cart from './Pages/Cart/Cart.js'

import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
              <Router>          
          <NavigationBar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/menu' element={<Menu />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
