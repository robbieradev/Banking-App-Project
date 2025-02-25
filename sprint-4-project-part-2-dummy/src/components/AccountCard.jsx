// import '../styles/AccountCard.css';
// import { useNavigate } from "react-router-dom";

// const AccountCard = ({ account, onDelete }) => {
//     const { accountType, accountId, balance, customer, interestRate } = account;
//     const navigate = useNavigate();

//     return (
//         <div className="account-card">
//             <p>Type: {accountType}</p>
//             <h3>Account ID: {accountId}</h3>
//             <p>Balance: {balance}</p>
//             <p>Customer ID: {customer}</p>
//             <p>Interest Rate: {interestRate}</p>
//             <div className="buttons">
//                 <button
//                     className="btn-primary"
//                     onClick={() => navigate(`/update-account/${accountId}`)}
//                 >
//                     Update
//                 </button>
//                 <button className="btn-danger" onClick={() => onDelete(accountId)}>
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AccountCard;
