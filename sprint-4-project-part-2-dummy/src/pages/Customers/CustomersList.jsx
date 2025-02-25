import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CustomersList = () => {
  const [searchValue, setSearchValue] = useState("");

  const customers = [
    {
      id: "1001",
      name: "Robert Radev",
      email: "Robert.Radev@fdmgroup.com",
      phone: "07999 215377",
    },
    {
      id: "1002",
      name: "Edgar Afonso",
      email: "Edgar.Afonso@fdmgroup.com",
      phone: "07123 456789",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.id.toLowerCase().includes(searchValue)
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const confirmDelete = (customerName) => {
    if (window.confirm(`Are you sure you want to delete ${customerName}?`)) {
      alert(`${customerName} has been deleted.`);
      // Logic for deletion would go here
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

          <h3>View All Customers</h3>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} data-customer-name={customer.name}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <Link to={`/customers/view/${customer.id}`} className="btn btn-view">
                      View
                    </Link>
                    <Link to={`/customers/update/${customer.id}`} className="btn btn-update">
                      Update
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => confirmDelete(customer.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CustomersList;
