import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './layout/Navigation';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
