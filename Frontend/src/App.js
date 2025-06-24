
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/users/UserList";
import ProductList from "./components/products/ProductList";
import TaskList from "./components/tasks/TaskList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/products">Products</Link>
          <Link className="nav-link" to="/tasks">Tasks</Link>
        </div>
      </nav>
      

      <div className="container mt-3">
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/tasks" element={<TaskList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
