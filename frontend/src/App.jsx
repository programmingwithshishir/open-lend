import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import OnBoarding from './components/OnBoarding';

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<OnBoarding />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;