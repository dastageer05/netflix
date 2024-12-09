import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Player from "./pages/Player/Player";
import Test from "./pages/bin/Test";
import Test2 from "./pages/VideoPlayer/Slides";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </div>
  );
};

export default App;
