
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./components/MessageSection";
import Gallery from "./components/GallerySection";
import Birthday from "./Birthday"; // renamed from App
import Navbar from "./components/Navbar";
import PickupLine from "./components/BirthdayCode";
import Hero from "./components/HeroSection";

const App = () => {
  return (
    <div> {/* adjust as needed */}
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PickupLine />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/message" element={<Message />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
