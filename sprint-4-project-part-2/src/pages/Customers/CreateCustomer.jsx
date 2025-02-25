import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const CreateCustomer = () => {
  const navigate = useNavigate();

  // State for form fields
  const [customerType, setCustomerType] = useState("person");
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    streetNumber: "",
    postalCode: "",
    city: "",
    province: "",
  });
  const [error, setError] = useState("");

  // Handle changes for inputs
  const handleCustomerTypeChange = (event) => setCustomerType(event.target.value);

  const handleAddressChange = (event) =>
    setAddress({ ...address, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        name,
        address,
      };

      const endpoint =
        customerType === "person"
          ? "http://localhost:8080/api/customers/person"
          : "http://localhost:8080/api/customers/company";

      await axios.post(endpoint, payload);

      alert("Customer created successfully!");
      navigate("/customers");
    } catch (error) {
      console.error(error);
      setError("Failed to create customer. Please try again.");
    }
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
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
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer's name"
              required
            />

            <h3>Address Details</h3>
            <label htmlFor="street">Address</label>
            <input
              type="text"
              id="street"
              name="streetNumber"
              value={address.streetNumber}
              onChange={handleAddressChange}
              placeholder="Enter street"
              required
            />

            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              id="postal-code"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              placeholder="Enter postal code"
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="Enter city"
              required
            />

            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={address.province}
              onChange={handleAddressChange}
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
