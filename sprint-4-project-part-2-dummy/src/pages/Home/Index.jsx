import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/customers">Customers Management Tool</Link>
            </li>
            <li>
              <Link to="/accounts">Accounts Management Tool</Link>
            </li>
            <li>
              <Link to="/api-list-all">Get All Users (API) </Link>
            </li>
          </ul>
        </nav>
        <main>
          <section>
            <h2>Welcome to the Bank Management System</h2>
            <p>Use the navigation menu to manage customers and accounts.</p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
