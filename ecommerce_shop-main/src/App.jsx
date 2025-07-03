import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ItemDesc from "./components/ItemDesc";
import Cart from "./components/Cart";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product" element={<ItemDesc />} />
        <Route path="/product/:id" element={<ItemDesc />} />
      </Routes>
    </Router>
  );
}




export default App;


