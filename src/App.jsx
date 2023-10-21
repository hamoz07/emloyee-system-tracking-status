import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import CatContext from "./context/context.js";
import { useState } from "react";

function App() {
  const [cat, setCategories] = useState(null);

  const val = { cat, setCategories };

  return (
    <CatContext.Provider value={val}>
      <div className="App">
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<TicketsPage />} />
            <Route
              path="/ticket/:id"
              element={<TicketsPage editMode={true} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </CatContext.Provider>
  );
}

export default App;
