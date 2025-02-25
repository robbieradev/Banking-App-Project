import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ViewCustomer = () => {
  const { id } = useParams(); // Get customer ID from the URL
  const navigate = useNavigate(); // For "Go Back" functionality

  const [customer, setCustomer] = useState(null);

  // Simulated customer data
  const customers = {
    1001: {
      id: "1001",
      name: "Robert Radev",
      type: "Person",
      street: "456 High Street",
      postalCode: "B2C 3D4",
      city: "Edinburgh",
      province: "Scotland",
      accounts: [
        { id: "1", type: "Savings Account", balance: "1500.00" },
        { id: "2", type: "Checking Account", balance: "800.00" },
      ],
    },
    1002: {
      id: "1002",
      name: "Edgar Afonso",
      type: "Company",
      street: "123 Main Street",
      postalCode: "A1B 2C3",
      city: "Glasgow",
      province: "Scotland",
      accounts: [
        { id: "3", type: "Savings Account", balance: "1500.00" },
        { id: "4", type: "Checking Account", balance: "3200.00" },
      ],
    },
  };

  useEffect(() => {
    // Fetch customer details based on ID
    if (customers[id]) {
      setCustomer(customers[id]);
    } else {
      alert("Invalid customer ID!");
    }
  }, [id]);

  if (!customer) return <p>Loading customer details...</p>;

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
          <h2>Customer Details</h2>
          {/* <div className="details-container"> */}
            <p>
              <strong>Customer ID:</strong> {customer.id}
            </p>
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Type:</strong> {customer.type}
            </p>
            <p>
              <strong>Address:</strong> {`${customer.street}, ${customer.city}, ${customer.province}, ${customer.postalCode}`}
            </p>

            <h3>Accounts</h3>
            <table>
              <thead>
                <tr>
                  <th>Account ID</th>
                  <th>Account Type</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customer.accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.type}</td>
                    <td>£{account.balance}</td>
                    <td>
                      <Link to={`/accounts/view/${account.id}`} className="btn btn-view">View</Link>
                      <Link to={`/accounts/update/${account.id}`} className="btn btn-update">Update</Link>
                      <button className="btn btn-delete" onClick={() => alert(`Delete account ${account.id}`)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          {/* </div> */}
          <button className="btn-go-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ViewCustomer;
