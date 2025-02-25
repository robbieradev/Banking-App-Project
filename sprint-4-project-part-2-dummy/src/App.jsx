import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Home/Index";
import CustomersList from "./pages/Customers/CustomersList";
import CreateCustomer from "./pages/Customers/CreateCustomer";
import UpdateCustomer from "./pages/Customers/UpdateCustomer";
import ViewCustomer from "./pages/Customers/ViewCustomer";
import AccountsList from "./pages/Accounts/AccountsList";
import CreateAccount from "./pages/Accounts/CreateAccount";
import UpdateAccount from "./pages/Accounts/UpdateAccount";
import ViewAccount from "./pages/Accounts/ViewAccount";
// import AccountsListAPI from "./pages/Accounts/AccountsListAPI";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Customers */}
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customers/update/:id" element={<UpdateCustomer />} />
          <Route path="/customers/view/:id" element={<ViewCustomer />} />
          {/* Accounts */}
          <Route path="/accounts" element={<AccountsList />} />
          <Route path="/accounts/create" element={<CreateAccount />} />
          <Route path="/accounts/update/:id" element={<UpdateAccount />} />
          <Route path="/accounts/view/:id" element={<ViewAccount />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
