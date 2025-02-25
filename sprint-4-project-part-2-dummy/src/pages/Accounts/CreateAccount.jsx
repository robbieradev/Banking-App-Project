import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CreateAccount = () => {
  const [accountType, setAccountType] = useState("savings");
  const navigate = useNavigate();

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
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
            <form>
              <label htmlFor="account-id">Account ID</label>
              <input type="text" id="account-id" name="account-id" value="1" readOnly />

              <label htmlFor="customer">Select Customer</label>
              <select id="customer" name="customer" required>
                <option value="1001">1001 - Robert Radev</option>
                <option value="1002">1002 - Edgar Afonso</option>
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
                  <label htmlFor="interest-rate">Interest Rate</label>
                  <input
                    type="text"
                    id="interest-rate"
                    name="interest-rate"
                    placeholder="Enter interest rate (e.g., 1.5%)"
                    required
                  />
                </div>
              )}

              {accountType === "checking" && (
                <div id="checking-fields" className="account-type-fields active">
                  <label htmlFor="next-check-number">Next Check Number</label>
                  <input
                    type="text"
                    id="next-check-number"
                    name="next-check-number"
                    placeholder="Enter next check number"
                    required
                  />
                </div>
              )}

              <label htmlFor="account-balance">Account Balance</label>
              <input
                type="text"
                id="account-balance"
                name="account-balance"
                placeholder="Enter account balance"
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
