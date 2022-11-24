import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";
import PageCharacter from "./pages/PageCharacter";
import SortFavoris from "./pages/SortFavoris";

// components
import Header from "./components/Header";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/character/:id" element={<PageCharacter />} />
        <Route path="/favoris/class" element={<SortFavoris />} />
      </Routes>
    </Router>
  );
}

export default App;
