import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CreateCustomer = () => {
  const navigate = useNavigate();

  const [customerType, setCustomerType] = useState("person");

  const handleCustomerTypeChange = (event) => {
    setCustomerType(event.target.value);
  };

  const handleCancel = () => {
    navigate("/customers");
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
          <h2>Create Customer</h2>
          <form>
            <label htmlFor="customer-id">Customer ID</label>
            <input type="text" id="customer-id" name="customer-id" value="1003" readOnly />

            <label htmlFor="customer-type">Customer Type</label>
            <select
              id="customer-type"
              name="customer-type"
              value={customerType}
              onChange={handleCustomerTypeChange}
              required
            >
              <option value="person">Person</option>
              <option value="company">Company</option>
            </select>

            <label htmlFor="customer-name">Full Name</label>
            <input
              type="text"
              id="customer-name"
              name="customer-name"
              placeholder="Enter customer's name"
              required
            />

            <h3>Address Details</h3>
            <label htmlFor="street">Address</label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Enter street"
              required
            />

            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              placeholder="Enter postal code"
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city"
              required
            />

            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              placeholder="Enter province"
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

export default CreateCustomer;
