import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:name" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
