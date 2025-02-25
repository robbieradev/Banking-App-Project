import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const UpdateAccount = () => {
  const { id } = useParams(); // Dynamic ID from route
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState({
    accountId: "",
    customerId: "",
    customerName: "",
    accountType: "",
    balance: "",
    interestRate: "",
    nextCheckNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/accounts/${id}`)
      .then((response) => {
        const account = response.data;
        setAccountData({
          accountId: account.accountId,
          customerId: account.customerId || "",
          customerName: account.customerName || "",
          accountType: account.type, // Assuming type indicates "Savings" or "Checking"
          balance: account.balance,
          interestRate: account.interestRate || "",
          nextCheckNumber: account.nextCheckNumber || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch account data.");
        setLoading(false);
      });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    const endpoint =
      accountData.accountType === "Savings"
        ? `http://localhost:8080/api/accounts/savings/${id}`
        : `http://localhost:8080/api/accounts/checking/${id}`;

    axios
      .put(endpoint, accountData)
      .then(() => {
        alert("Account updated successfully!");
        navigate("/accounts");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update the account.");
      });
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
          <h2>Update Account</h2>
          {loading && <p>Loading account data...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <form onSubmit={handleSave}>
              <label htmlFor="account-id">Account ID</label>
              <input type="text" id="account-id" value={accountData.accountId} readOnly />

              <label htmlFor="customer-id">Customer ID</label>
              <input type="text" id="customer-id" value={accountData.customerId} readOnly />

              <label htmlFor="customer-name">Customer Name</label>
              <input type="text" id="customer-name" value={accountData.customerName} readOnly />

              <label htmlFor="account-type">Account Type</label>
              <input type="text" id="account-type" value={accountData.accountType} readOnly />

              <label htmlFor="account-balance">Account Balance</label>
              <input
                type="number"
                id="account-balance"
                value={accountData.balance}
                onChange={(e) => setAccountData({ ...accountData, balance: e.target.value })}
              />

              {accountData.accountType === "Savings" && (
                <div id="savings-fields">
                  <label htmlFor="interest-rate">Interest Rate</label>
                  <input
                    type="number"
                    id="interest-rate"
                    value={accountData.interestRate}
                    onChange={(e) => setAccountData({ ...accountData, interestRate: e.target.value })}
                  />
                </div>
              )}

              {accountData.accountType === "Checking" && (
                <div id="checking-fields">
                  <label htmlFor="next-check-number">Next Check Number</label>
                  <input
                    type="number"
                    id="next-check-number"
                    value={accountData.nextCheckNumber}
                    onChange={(e) => setAccountData({ ...accountData, nextCheckNumber: e.target.value })}
                  />
                </div>
              )}

              <button type="submit" className="btn-save">
                Save
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => navigate("/accounts")}
              >
                Cancel
              </button>
            </form>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateAccount;
