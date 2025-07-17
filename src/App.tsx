
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./components/MessageSection";
import Birthday from "./Birthday"; // renamed from App
import PickupLine from "./components/BirthdayCode";
// import Balloons from "./components/Balloons";

const App = () => {
  return (
    <div className="">
    <Router>
      <Routes>
        <Route path="/" element={<PickupLine />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/message" element={<Message />} />
        {/* <Balloons /> */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;
