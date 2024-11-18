import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Player from "./pages/Player/Player";
import Test from "./pages/VideoPlayer/Test";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/video" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
