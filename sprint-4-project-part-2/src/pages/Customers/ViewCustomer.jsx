import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ViewCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/customers/${id}`);
        setCustomer(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch customer:", err);
        setError("Failed to load customer details. Please try again later.");
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p>{error}</p>;

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
          <p>
            <strong>Customer ID:</strong> {customer.customerId}
          </p>
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Address:</strong> {`${customer.address.streetNumber}, ${customer.address.city}, ${customer.address.province}, ${customer.address.postalCode}`}
          </p>
          <h3>Accounts</h3>
          {customer.accounts && customer.accounts.length > 0 ? (
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
                  <tr key={account.accountId}>
                    <td>{account.accountId}</td>
                    <td>{account.type}</td>
                    <td>£{account.balance}</td>
                    <td>
                      <Link to={`/accounts/view/${account.accountId}`} className="btn btn-view">View</Link>
                      <Link to={`/accounts/update/${account.accountId}`} className="btn btn-update">Update</Link>
                      <button className="btn btn-delete" onClick={() => alert(`Delete account ${account.accountId}`)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No accounts found for this customer.</p>
          )}
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
