import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    type: "person",
    street: "",
    postalCode: "",
    city: "",
    province: "",
  });

  useEffect(() => {
    // Simulate fetching data for the customer
    const customers = {
      1001: {
        id: "1001",
        name: "Robert Radev",
        type: "person",
        street: "456 High Street",
        postalCode: "B2C 3D4",
        city: "Edinburgh",
        province: "Scotland",
      },
      1002: {
        id: "1002",
        name: "Edgar Afonso",
        type: "company",
        street: "123 Main Street",
        postalCode: "A1B 2C3",
        city: "Glasgow",
        province: "Scotland",
      },
    };

    if (customers[id]) {
      setCustomer(customers[id]);
    } else {
      alert("Invalid customer ID!");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving data
    alert(`Customer ${customer.name} has been updated.`);
    navigate("/customers");
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="customer-id">Customer ID</label>
            <input
              type="text"
              id="customer-id"
              name="id"
              value={customer.id}
              readOnly
            />

            <label htmlFor="type">Customer Type</label>
            <select
              id="type"
              name="type"
              value={customer.type}
              onChange={handleChange}
              required
            >
              <option value="person">Person</option>
              <option value="company">Company</option>
            </select>

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
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={customer.street}
              onChange={handleChange}
              required
            />

            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              id="postal-code"
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
