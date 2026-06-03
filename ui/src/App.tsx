// AI GENERATED FILE: src/App.tsx

import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppPage from "./pages/AppPage/AppPage";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";

const App = () => {
  console.log("APP");
  return (
    <Routes>
      <Route path="/" element={<AppPage />} />
      <Route path="/reviews/:id" element={<ReviewsPage />} />
    </Routes>
  );
};

export default App;
