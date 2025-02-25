// src/pages/Accounts/UpdateAccount.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UpdateAccount = () => {
  const { id } = useParams(); // For dynamic routing
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState({
    accountId: "",
    customerId: "",
    customerName: "",
    accountType: "",
    accountBalance: "",
    interestRate: "",
    nextCheckNumber: "",
  });

  useEffect(() => {
    // Simulate fetching data
    const accounts = {
      1: {
        accountId: "1",
        accountType: "Savings Account",
        accountBalance: "1500.00",
        interestRate: "1.5",
        nextCheckNumber: null,
        customerId: "1001",
        customerName: "Robert Radev",
      },
      2: {
        accountId: "2",
        accountType: "Checking Account",
        accountBalance: "800.00",
        interestRate: null,
        nextCheckNumber: "120",
        customerId: "1001",
        customerName: "Robert Radev",
      },
      3: {
        accountId: "3",
        accountType: "Savings Account",
        accountBalance: "1500.00",
        interestRate: "2.2",
        nextCheckNumber: null,
        customerId: "1002",
        customerName: "Edgar Afonso",
      },
      4: {
        accountId: "4",
        accountType: "Checking Account",
        accountBalance: "3200.00",
        interestRate: null,
        nextCheckNumber: "200",
        customerId: "1002",
        customerName: "Edgar Afonso",
      },
    };

    if (id && accounts[id]) {
      const account = accounts[id];
      setAccountData({
        accountId: account.accountId,
        customerId: account.customerId,
        customerName: account.customerName,
        accountType: account.accountType,
        accountBalance: account.accountBalance,
        interestRate: account.interestRate,
        nextCheckNumber: account.nextCheckNumber,
      });
    } else {
      alert("Invalid account ID!");
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to handle save action
    alert("Account details updated successfully!");
    navigate("/accounts");
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
              type="text"
              id="account-balance"
              value={accountData.accountBalance}
              onChange={(e) => setAccountData({ ...accountData, accountBalance: e.target.value })}
            />

            {accountData.accountType === "Savings Account" && (
              <div id="savings-fields">
                <label htmlFor="interest-rate">Interest Rate</label>
                <input
                  type="text"
                  id="interest-rate"
                  value={accountData.interestRate}
                  onChange={(e) => setAccountData({ ...accountData, interestRate: e.target.value })}
                />
              </div>
            )}

            {accountData.accountType === "Checking Account" && (
              <div id="checking-fields">
                <label htmlFor="next-check-number">Next Check Number</label>
                <input
                  type="text"
                  id="next-check-number"
                  value={accountData.nextCheckNumber}
                  onChange={(e) => setAccountData({ ...accountData, nextCheckNumber: e.target.value })}
                />
              </div>
            )}

            <button type="submit" className="btn-save">
              Save
            </button>
            <button type="button" className="btn cancel-btn" onClick={() => navigate("/accounts")}>
              Cancel
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateAccount;
