import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import AdminPanel from "./pages/AdminPanel";
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:name" element={<ChatRoom />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route index />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
