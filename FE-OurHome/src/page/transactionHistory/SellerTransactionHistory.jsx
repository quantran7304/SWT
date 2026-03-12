// import React, { useState, useEffect } from 'react';
// import { getTransactionHistory } from '../../services/payService';
// import { Link } from 'react-router-dom'; // Hỗ trợ liên kết trong sidebar
// import '../sellerdashboard/SellerDashboard.css'; // Dùng kiểu dáng dashboard
// import './TransactionHistory.css'; // Định dạng bảng và form
// import testpicture from '../../Assets/testpicture.jpg'; // Avatar trong header
// import 'bootstrap-icons/font/bootstrap-icons.css'; // Biểu tượng sidebar
//
// const SellerTransactionHistory = () => {
//     const [allTransactions, setAllTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchParams, setSearchParams] = useState({
//         transactionCode: '',
//         status: '',
//         paymentDate: ''
//     });
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//
//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };
//
//     useEffect(() => {
//         const fetchAllTransactions = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getTransactionHistory('all');
//                 console.log('Fetched all transactions:', data);
//                 if (!data || data.length === 0) {
//                     setError('No transactions found.');
//                 } else {
//                     setAllTransactions(data);
//                     setFilteredTransactions(data);
//                 }
//             } catch (err) {
//                 console.error('Fetch error:', err);
//                 setError('Unable to load transaction history: ' + err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllTransactions();
//     }, []);
//
//     const handleSearchChange = (e) => {
//         const { name, value } = e.target;
//         setSearchParams(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleSearchSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const data = await getTransactionHistory('all', searchParams);
//             console.log('Search result:', data);
//             if (!data || data.length === 0) {
//                 if (searchParams.paymentDate) {
//                     setError('No transactions on this date');
//                 } else {
//                     setError('No transactions found for the search criteria.');
//                 }
//                 setFilteredTransactions([]);
//             } else {
//                 setFilteredTransactions(data);
//                 setError(null);
//             }
//         } catch (err) {
//             console.error('Search error:', err);
//             setError('Unable to load transaction history: ' + err.message);
//             setFilteredTransactions([]);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="dashboard-container">
//             {/* Sidebar */}
//             <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
//                 <div className="sidebar-header">
//                     <h2>FLEX LIVING</h2>
//                     <button className="toggle-btn" onClick={toggleSidebar}>
//                         <i className={`bi ${isSidebarOpen ? "bi-x" : "bi-list"}`}></i>
//                     </button>
//                 </div>
//                 <nav className="sidebar-nav">
//                     <ul>
//                         <li>
//                             <Link to="/seller/dashboard">
//                                 <i className="bi bi-list-ul"></i>
//                                 <span>My Listings</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/seller/analytics">
//                                 <i className="bi bi-bar-chart"></i>
//                                 <span>Sales Analytics</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/seller/add-property">
//                                 <i className="bi bi-plus-circle"></i>
//                                 <span>Add Property</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/seller/profile">
//                                 <i className="bi bi-person"></i>
//                                 <span>Profile</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/seller/transaction-history">
//                                 <i className="bi bi-clock-history"></i>
//                                 <span>Transaction History</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/logout">
//                                 <i className="bi bi-box-arrow-right"></i>
//                                 <span>Logout</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>
//
//             {/* Main Content */}
//             <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//                 {/* Header */}
//                 <header className="dashboard-header">
//                     <h1>Transaction History</h1>
//                     <div className="user-info">
//                         <img
//                             src={testpicture}
//                             alt="Seller Avatar"
//                             className="user-avatar"
//                         />
//                         <span>Jane Seller</span>
//                     </div>
//                 </header>
//
//                 {/* Transaction History Content */}
//                 {loading ? (
//                     <div className="text-center py-4">Loading...</div>
//                 ) : error ? (
//                     <div className="recent-properties">
//                         <form onSubmit={handleSearchSubmit} className="mb-4">
//                             <div className="row g-3">
//                                 <div className="col-md-4">
//                                     <input
//                                         type="text"
//                                         name="transactionCode"
//                                         value={searchParams.transactionCode}
//                                         onChange={handleSearchChange}
//                                         placeholder="Enter transaction code"
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="col-md-4">
//                                     <select
//                                         name="status"
//                                         value={searchParams.status}
//                                         onChange={handleSearchChange}
//                                         className="form-select"
//                                     >
//                                         <option value="">All statuses</option>
//                                         <option value="SUCCESS">Success</option>
//                                         <option value="PENDING">Pending</option>
//                                         <option value="CANCELLED">Cancelled</option> {/* Thêm tùy chọn CANCELLED */}
//                                     </select>
//                                 </div>
//                                 <div className="col-md-3">
//                                     <input
//                                         type="date"
//                                         name="paymentDate"
//                                         value={searchParams.paymentDate}
//                                         onChange={handleSearchChange}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="col-md-1">
//                                     <button type="submit" className="btn btn-primary w-100">
//                                         Search
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                         <div className="table-responsive">
//                             <table className="table table-striped table-hover">
//                                 <thead className="table-dark">
//                                 <tr>
//                                     <th>Transaction Code</th>
//                                     <th>Amount</th>
//                                     <th>Status</th>
//                                     <th>Payment Date</th>
//                                     <th>Note</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 <tr>
//                                     <td colSpan="5" className="text-danger text-center py-4">{error}</td>
//                                 </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="recent-properties">
//                         <form onSubmit={handleSearchSubmit} className="mb-4">
//                             <div className="row g-3">
//                                 <div className="col-md-4">
//                                     <input
//                                         type="text"
//                                         name="transactionCode"
//                                         value={searchParams.transactionCode}
//                                         onChange={handleSearchChange}
//                                         placeholder="Enter transaction code"
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="col-md-4">
//                                     <select
//                                         name="status"
//                                         value={searchParams.status}
//                                         onChange={handleSearchChange}
//                                         className="form-select"
//                                     >
//                                         <option value="">All statuses</option>
//                                         <option value="SUCCESS">Success</option>
//                                         <option value="PENDING">Pending</option>
//                                         <option value="CANCELLED">Cancelled</option> {/* Thêm tùy chọn CANCELLED */}
//                                     </select>
//                                 </div>
//                                 <div className="col-md-3">
//                                     <input
//                                         type="date"
//                                         name="paymentDate"
//                                         value={searchParams.paymentDate}
//                                         onChange={handleSearchChange}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="col-md-1">
//                                     <button type="submit" className="btn btn-primary w-100">
//                                         Search
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                         <div className="table-responsive">
//                             <table className="table table-striped table-hover">
//                                 <thead className="table-dark">
//                                 <tr>
//                                     <th>Transaction Code</th>
//                                     <th>Amount</th>
//                                     <th>Status</th>
//                                     <th>Payment Date</th>
//                                     <th>Note</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {filteredTransactions.length > 0 ? (
//                                     filteredTransactions.map((transaction) => (
//                                         <tr key={transaction.paymentId}>
//                                             <td>{transaction.transactionCode}</td>
//                                             <td>{transaction.amount.toLocaleString()} VNĐ</td>
//                                             <td>
//                                                 <span
//                                                     className={`badge ${
//                                                         transaction.status === 'SUCCESS'
//                                                             ? 'badge-success'
//                                                             : transaction.status === 'CANCELLED'
//                                                                 ? 'badge-danger' // Màu đỏ cho CANCELLED
//                                                                 : 'badge-warning' // PENDING
//                                                     }`}
//                                                 >
//                                                     {transaction.status}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 {new Date(transaction.paymentDate).toLocaleString('vi-VN', {
//                                                     year: 'numeric',
//                                                     month: '2-digit',
//                                                     day: '2-digit',
//                                                     hour: '2-digit',
//                                                     minute: '2-digit',
//                                                     timeZone: 'Asia/Ho_Chi_Minh'
//                                                 })}
//                                             </td>
//                                             <td>{transaction.note}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" className="text-center">
//                                             {searchParams.paymentDate ? 'No transactions on this date' : 'No transactions available.'}
//                                         </td>
//                                     </tr>
//                                 )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default SellerTransactionHistory;