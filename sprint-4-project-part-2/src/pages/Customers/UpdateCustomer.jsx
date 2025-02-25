import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for customer data
  const [customer, setCustomer] = useState({
    name: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    province: "",
  });

  const [error, setError] = useState("");

  // Fetch customer details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customers/${id}`)
      .then((response) => {
        const { name, address } = response.data;
        setCustomer({
          name,
          streetNumber: address.streetNumber,
          postalCode: address.postalCode,
          city: address.city,
          province: address.province,
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load customer details.");
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated customer data
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: customer.name,
      streetNumber: customer.streetNumber,
      postalCode: customer.postalCode,
      city: customer.city,
      province: customer.province,
    };

    axios
      .put(`http://localhost:8080/api/customers/${id}`, updatedData)
      .then(() => {
        alert("Customer updated successfully.");
        navigate("/customers");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update customer.");
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/customers">Customers Management Tool</a>
            </li>
            <li>
              <a href="/accounts">Accounts Management Tool</a>
            </li>
          </ul>
        </nav>
        <main>
          <h2>Update Customer</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <h3>Address Details</h3>
            <label htmlFor="streetNumber">Street Number</label>
            <input
              type="text"
              id="streetNumber"
              name="streetNumber"
              value={customer.streetNumber}
              onChange={handleChange}
              required
            />

            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={customer.postalCode}
              onChange={handleChange}
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={customer.city}
              onChange={handleChange}
              required
            />

            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={customer.province}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-save">
              Save
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => navigate("/customers")}
            >
              Cancel
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCustomer;
