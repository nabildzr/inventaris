import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barang-inventaris" element={<Home />} />
          <Route path="/peminjaman-barang" element={<Home />} />
          <Route path="/laporan" element={<Home />} />
          <Route path="/referensi" element={<Home />}  />
        </Routes>
      </Router>
    </>
  );
}

export default App;
