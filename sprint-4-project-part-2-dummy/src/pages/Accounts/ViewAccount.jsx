import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ViewAccount = () => {
  const { id } = useParams(); // Get account ID from the URL
  const navigate = useNavigate(); // For "Go Back" functionality

  const [account, setAccount] = useState(null);

  // Simulated account data
  const accounts = {
    1: {
      id: "1",
      type: "Savings Account",
      balance: "1500.00",
      interestRate: "1.5",
      nextCheckNumber: null,
      customerId: "1001",
      customerName: "Robert Radev",
    },
    2: {
      id: "2",
      type: "Checking Account",
      balance: "800.00",
      interestRate: null,
      nextCheckNumber: "120",
      customerId: "1002",
      customerName: "Edgar Afonso",
    },
    3: {
      id: "3",
      type: "Savings Account",
      balance: "1500.00",
      interestRate: "1.5",
      nextCheckNumber: null,
      customerId: "1001",
      customerName: "Robert Radev",
    },
    4: {
      id: "4",
      type: "Checking Account",
      balance: "3200.00",
      interestRate: null,
      nextCheckNumber: "200",
      customerId: "1002",
      customerName: "Edgar Afonso",
    },
  };

  useEffect(() => {
    // Fetch account details based on ID
    if (accounts[id]) {
      setAccount(accounts[id]);
    } else {
      alert("Invalid account ID!");
    }
  }, [id]);

  if (!account) return <p>Loading account details...</p>;

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
          <h2>Account Details</h2>
          <div className="details-container">
            <p>
              <strong>Account ID:</strong> {account.id}
            </p>
            <p>
              <strong>Type:</strong> {account.type}
            </p>
            <p>
              <strong>Balance:</strong> £{account.balance}
            </p>

            {account.type === "Savings Account" && (
              <div id="savings-details">
                <p>
                  <strong>Interest Rate:</strong> {account.interestRate}%
                </p>
              </div>
            )}

            {account.type === "Checking Account" && (
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
      < Footer />
    </div>
  );
};

export default ViewAccount;
