import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts")
      .then((response) => {
        setAccounts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch accounts.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredAccounts = accounts.filter((account) =>
    account.accountId.toString().includes(searchValue)
  );

  const confirmDelete = (accountId) => {
    if (window.confirm(`Are you sure you want to delete account ${accountId}?`)) {
      axios
        .delete(`http://localhost:8080/api/accounts/${accountId}`)
        .then(() => {
          alert(`Account ${accountId} has been deleted.`);
          setAccounts(accounts.filter((account) => account.accountId !== accountId));
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete the account.");
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
          <h2>Accounts</h2>
          {loading && <p>Loading accounts...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <>
              <p>Manage your customers&apos; accounts using the options below:</p>
              <Link to="/accounts/create" className="btn-add">Create Account</Link>

              <input
                type="text"
                className="search-bar"
                placeholder="Search Account's ID"
                value={searchValue}
                onChange={handleSearch}
              />

              <h3>View All Accounts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Account ID</th>
                    <th>Account Type</th>
                    <th>Account Balance</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.accountId} data-account-id={account.accountId}>
                      <td>{account.accountId}</td>
                      <td>{account.accountType}</td>
                      <td>£{account.balance.toFixed(2)}</td>
                      <td>{account.customerId}</td>
                      <td>{account.customerName}</td>
                      <td>
                        <Link to={`/accounts/view/${account.accountId}`} className="btn btn-view">
                          View
                        </Link>
                        <Link to={`/accounts/update/${account.accountId}`} className="btn btn-update">
                          Update
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => confirmDelete(account.accountId)}
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

export default AccountsList;
