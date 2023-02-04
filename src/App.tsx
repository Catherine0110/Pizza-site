import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';

import './styles/global.scss';

import { Routes, Route } from 'react-router-dom';
import PizzaDetail from './pages/PizzaDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="pizza/:id" element={<PizzaDetail />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
