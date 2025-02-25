import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AccountsList = () => {
  const [searchValue, setSearchValue] = useState("");

  const accounts = [
    {
      id: "1",
      type: "Savings",
      balance: "£1,500.00",
      customerId: "1001",
      customerName: "Robert Radev",
    },
    {
      id: "2",
      type: "Checking",
      balance: "£800.00",
      customerId: "1001",
      customerName: "Robert Radev",
    },
    {
      id: "3",
      type: "Savings",
      balance: "£1,500.00",
      customerId: "1002",
      customerName: "Edgar Afonso",
    },
    {
      id: "4",
      type: "Checking",
      balance: "£3,200.00",
      customerId: "1002",
      customerName: "Edgar Afonso",
    },
  ];

  const filteredAccounts = accounts.filter((account) =>
    account.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const confirmDelete = (accountId) => {
    if (window.confirm(`Are you sure you want to delete account ${accountId}?`)) {
      alert(`Account ${accountId} has been deleted.`);
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
          <h2>Accounts</h2>
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
                <tr key={account.id} data-account-id={account.id}>
                  <td>{account.id}</td>
                  <td>{account.type}</td>
                  <td>{account.balance}</td>
                  <td>{account.customerId}</td>
                  <td>{account.customerName}</td>
                  <td>
                    <Link to={`/accounts/view/${account.id}`} className="btn btn-view">
                      View
                    </Link>
                    <Link to={`/accounts/update/${account.id}`} className="btn btn-update">
                      Update
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => confirmDelete(account.id)}
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

export default AccountsList;
