import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home/Home.js'
import Menu from './Pages/Menu/Menu.js'
import Cart from './Pages/Cart/Cart.js'
import ItemForm from './Pages/ItemForm/ItemForm.js'
import ItemDetails from './Pages/ItemDetails/ItemDetails';
import Footer from './Components/Footer.js'
import Login from './Pages/Login/Login'
import Checkout from './Pages/Checkout/Checkout'
import Receipt from './Pages/Receipt/Receipt';

import { useAuthContext } from './Hooks/useAuthContext';

import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <div className='content-wrap'>
          <Router>          
          <NavigationBar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/menu' element={<Menu />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            {user && <Route path='/itemForm' element={<ItemForm />}></Route>}
            {!user && <Route path='/itemForm' element={<Navigate replace to='/' />}></Route>}
            <Route path='/itemDetails/:id' element={<ItemDetails />}></Route>
            {user && <Route path='/login' element={<Navigate replace to="/" />} /> }
            {!user && <Route path='/login' element={<Login />}></Route>}
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/receipt' element={<Receipt />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
