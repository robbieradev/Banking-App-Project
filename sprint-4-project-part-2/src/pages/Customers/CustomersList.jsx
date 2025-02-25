import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CustomersList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch customers.");
        setLoading(false);
      });
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.customerId.toString().includes(searchValue)
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const confirmDelete = (customerId) => {
    if (window.confirm(`Are you sure you want to delete customer ID: ${customerId}?`)) {
      axios.delete(`http://localhost:8080/api/customers/${customerId}`)
        .then(() => {
          alert(`Customer with ID ${customerId} has been deleted.`);
          setCustomers(customers.filter((customer) => customer.customerId !== customerId));
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete the customer.");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/customers">Customers Management Tool</Link></li>
            <li><Link to="/accounts">Accounts Management Tool</Link></li>
          </ul>
        </nav>
        <main>
          <h2>Customers</h2>
          <p>Manage your customers using the options below:</p>
          <Link to="/customers/create" className="btn-add">Create Customer</Link>

          <input
            type="text"
            className="search-bar"
            placeholder="Search Customer's ID"
            value={searchValue}
            onChange={handleSearch}
          />

          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <>
              <h3>View All Customers</h3>
              <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.customerId} data-customer-name={customer.name}>
                      <td>{customer.customerId}</td>
                      <td>{customer.name}</td>
                      <td>
                        <Link to={`/customers/view/${customer.customerId}`} className="btn btn-view">
                          View
                        </Link>
                        <Link to={`/customers/update/${customer.customerId}`} className="btn btn-update">
                          Update
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => confirmDelete(customer.customerId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CustomersList;
