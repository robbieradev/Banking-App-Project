import { Link } from "react-router-dom";
import "../App.css"; // Ensure your CSS file path is correct

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/customers">Customers Management Tool</Link></li>
          <li><Link to="/accounts">Accounts Management Tool</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
