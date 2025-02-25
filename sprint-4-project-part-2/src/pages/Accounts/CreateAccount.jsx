import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CreateAccount = () => {
  const [accountType, setAccountType] = useState("savings");
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [accountDetails, setAccountDetails] = useState({
    balance: "",
    interestRate: "",
    nextCheckNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        setCustomers(response.data);
        if (response.data.length > 0) {
          setCustomerId(response.data[0].customerId); // Default to the first customer
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load customers.");
      });
  }, []);

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccountDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const accountData =
      accountType === "savings"
        ? {
            customerId,
            balance: parseFloat(accountDetails.balance),
            interestRate: parseFloat(accountDetails.interestRate),
          }
        : {
            customerId,
            balance: parseFloat(accountDetails.balance),
            nextCheckNumber: parseInt(accountDetails.nextCheckNumber, 10),
          };

    const endpoint =
      accountType === "savings"
        ? "http://localhost:8080/api/accounts/savings"
        : "http://localhost:8080/api/accounts/checking";

    axios
      .post(endpoint, accountData)
      .then(() => {
        alert("Account created successfully!");
        navigate("/accounts");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to create the account. Please try again.");
      });
  };

  const handleCancel = () => {
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
          <h2>Create Account</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="customer">Select Customer</label>
            <select
              id="customer"
              name="customer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            >
              {customers.map((customer) => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.customerId} - {customer.name}
                </option>
              ))}
            </select>

            <label htmlFor="account-type">Account Type</label>
            <select
              id="account-type"
              name="account-type"
              value={accountType}
              onChange={handleAccountTypeChange}
              required
            >
              <option value="savings">Savings Account</option>
              <option value="checking">Checking Account</option>
            </select>

            {accountType === "savings" && (
              <div id="savings-fields" className="account-type-fields active">
                <label htmlFor="interestRate">Interest Rate</label>
                <input
                  type="text"
                  id="interestRate"
                  name="interestRate"
                  placeholder="Enter interest rate (e.g., 1.5%)"
                  value={accountDetails.interestRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {accountType === "checking" && (
              <div id="checking-fields" className="account-type-fields active">
                <label htmlFor="nextCheckNumber">Next Check Number</label>
                <input
                  type="text"
                  id="nextCheckNumber"
                  name="nextCheckNumber"
                  placeholder="Enter next check number"
                  value={accountDetails.nextCheckNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <label htmlFor="balance">Account Balance</label>
            <input
              type="text"
              id="balance"
              name="balance"
              placeholder="Enter account balance"
              value={accountDetails.balance}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccount;
