import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './App.css';
import Gateway from "./Pages/Gateway";
import Gateways from "./Pages/Gateways";
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gateways" element={<Gateways />} />
        <Route path="/gateway/:id" element={<Gateway />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
