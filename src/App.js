import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";
import Character from "./pages/Character";

// components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/character" element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
