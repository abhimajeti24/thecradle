import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Gallery from "./pages/Gallery";
import Admissions from "./pages/Admissions";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admissions" element={<Admissions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
