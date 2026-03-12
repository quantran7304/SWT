//
//
// import React, { useState, useEffect } from 'react';
// import { getTransactionHistory } from '../../services/payService';
// import './TransactionHistory.css'; // Import CSS file here
//
// const TransactionHistory = () => {
//     const [allTransactions, setAllTransactions] = useState([]); // Lưu tất cả giao dịch
//     const [filteredTransactions, setFilteredTransactions] = useState([]); // Lưu giao dịch đã lọc
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchParams, setSearchParams] = useState({
//         transactionCode: '',
//         status: '',
//         paymentDate: ''
//     });
//
//     useEffect(() => {
//         const fetchAllTransactions = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getTransactionHistory('all');
//                 console.log('Fetched all transactions:', data); // Debug
//                 if (!data || data.length === 0) {
//                     setError('No transactions found.');
//                 } else {
//                     setAllTransactions(data);
//                     setFilteredTransactions(data); // Hiển thị tất cả khi tải trang
//                 }
//             } catch (err) {
//                 console.error('Fetch error:', err); // Debug
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
//         setSearchParams(prev => ({ ...prev, [name]: value })); // Chỉ cập nhật state, không lọc ngay
//     };
//
//     const handleSearchSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const data = await getTransactionHistory('all', searchParams); // Gọi API với tham số tìm kiếm
//             console.log('Search result:', data); // Debug
//             if (!data || data.length === 0) {
//                 if (searchParams.paymentDate) {
//                     setError('No transactions on this date');
//                 } else {
//                     setError('No transactions found for the search criteria.');
//                 }
//                 setFilteredTransactions([]); // Xóa dữ liệu đã lọc
//             } else {
//                 setFilteredTransactions(data);
//                 setError(null); // Xóa thông báo lỗi nếu có dữ liệu
//             }
//         } catch (err) {
//             console.error('Search error:', err); // Debug
//             setError('Unable to load transaction history: ' + err.message);
//             setFilteredTransactions([]); // Xóa dữ liệu đã lọc nếu lỗi
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     if (loading) return <div className="text-center py-4">Loading...</div>;
//     if (error) return (
//         <div className="container my-4">
//             <h1 className="text-3xl font-bold mb-4 text-primary">Transaction History</h1>
//             <form onSubmit={handleSearchSubmit} className="mb-4">
//                 <div className="row g-3">
//                     <div className="col-md-4">
//                         <input
//                             type="text"
//                             name="transactionCode"
//                             value={searchParams.transactionCode}
//                             onChange={handleSearchChange}
//                             placeholder="Enter transaction code"
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="col-md-4">
//                         <select
//                             name="status"
//                             value={searchParams.status}
//                             onChange={handleSearchChange}
//                             className="form-select"
//                         >
//                             <option value="">All statuses</option>
//                             <option value="SUCCESS">Success</option>
//                             <option value="PENDING">Pending</option>
//                             <option value="CANCELLED">Cancelled</option> {/* Thêm tùy chọn CANCELLED */}
//                         </select>
//                     </div>
//                     <div className="col-md-3">
//                         <input
//                             type="date"
//                             name="paymentDate"
//                             value={searchParams.paymentDate}
//                             onChange={handleSearchChange}
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="col-md-1">
//                         <button type="submit" className="btn btn-primary w-100">
//                             Search
//                         </button>
//                     </div>
//                 </div>
//             </form>
//             <div className="table-responsive">
//                 <table className="table table-striped table-hover">
//                     <thead className="table-dark">
//                     <tr>
//                         <th>Transaction Code</th>
//                         <th>Amount</th>
//                         <th>Status</th>
//                         <th>Payment Date</th>
//                         <th>Note</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td colSpan="5" className="text-danger text-center py-4">{error}</td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
//
//     return (
//         <div className="container my-4">
//             <h1 className="text-3xl font-bold mb-4 text-primary">Transaction History</h1>
//
//             <form onSubmit={handleSearchSubmit} className="mb-4">
//                 <div className="row g-3">
//                     <div className="col-md-4">
//                         <input
//                             type="text"
//                             name="transactionCode"
//                             value={searchParams.transactionCode}
//                             onChange={handleSearchChange}
//                             placeholder="Enter transaction code"
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="col-md-4">
//                         <select
//                             name="status"
//                             value={searchParams.status}
//                             onChange={handleSearchChange}
//                             className="form-select"
//                         >
//                             <option value="">All statuses</option>
//                             <option value="SUCCESS">Success</option>
//                             <option value="PENDING">Pending</option>
//                             <option value="CANCELLED">Cancelled</option> {/* Thêm tùy chọn CANCELLED */}
//                         </select>
//                     </div>
//                     <div className="col-md-3">
//                         <input
//                             type="date"
//                             name="paymentDate"
//                             value={searchParams.paymentDate}
//                             onChange={handleSearchChange}
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="col-md-1">
//                         <button type="submit" className="btn btn-primary w-100">
//                             Search
//                         </button>
//                     </div>
//                 </div>
//             </form>
//
//             <div className="table-responsive">
//                 <table className="table table-striped table-hover">
//                     <thead className="table-dark">
//                     <tr>
//                         <th>Transaction Code</th>
//                         <th>Amount</th>
//                         <th>Status</th>
//                         <th>Payment Date</th>
//                         <th>Note</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {filteredTransactions.length > 0 ? (
//                         filteredTransactions.map((transaction) => (
//                             <tr key={transaction.paymentId}>
//                                 <td>{transaction.transactionCode}</td>
//                                 <td>{transaction.amount.toLocaleString()} VNĐ</td>
//                                 <td>
//                                     <span
//                                         className={`badge ${
//                                             transaction.status === 'SUCCESS'
//                                                 ? 'badge-success'
//                                                 : transaction.status === 'CANCELLED'
//                                                     ? 'badge-danger' // Màu đỏ cho CANCELLED
//                                                     : 'badge-warning' // PENDING
//                                         }`}
//                                     >
//                                         {transaction.status}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     {new Date(transaction.paymentDate).toLocaleString('vi-VN', {
//                                         year: 'numeric',
//                                         month: '2-digit',
//                                         day: '2-digit',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                         timeZone: 'Asia/Ho_Chi_Minh'
//                                     })}
//                                 </td>
//                                 <td>{transaction.note}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="text-center">
//                                 {searchParams.paymentDate ? 'No transactions on this date' : 'No transactions available.'}
//                             </td>
//                         </tr>
//                     )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
//
// export default TransactionHistory;
//
