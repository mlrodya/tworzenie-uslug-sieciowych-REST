import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AuctionDetails from './pages/AuctionDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auction/:id" element={<AuctionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;