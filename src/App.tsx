import Users from "./Pages/Users";
import Posts from "./Pages/Posts";
import Post from "./Pages/Post";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/posts/:userId/:userName" element={<Posts />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
