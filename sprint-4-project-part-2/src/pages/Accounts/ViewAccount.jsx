import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const ViewAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/accounts/${id}`)
      .then((response) => {
        setAccount(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load account details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
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
          </ul>
        </nav>
        <main>
          <h2>Account Details</h2>
          <div className="details-container">
            <p>
              <strong>Account ID:</strong> {account.accountId}
            </p>
            <p>
              <strong>Type:</strong> {account.accountType}
            </p>
            <p>
              <strong>Balance:</strong> £{account.balance.toFixed(2)}
            </p>

            {account.accountType === "SavingsAccount" && (
              <div id="savings-details">
                <p>
                  <strong>Interest Rate:</strong> {account.interestRate}%
                </p>
              </div>
            )}

            {account.accountType === "CheckingAccount" && (
              <div id="checking-details">
                <p>
                  <strong>Next Check Number:</strong> {account.nextCheckNumber}
                </p>
              </div>
            )}

            <h3>Associated Customer</h3>
            <p>
              <Link to={`/customers/view/${account.customerId}`} className="btn btn-view">
                {account.customerName}
              </Link>
            </p>
          </div>
          <button className="btn-go-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAccount;
