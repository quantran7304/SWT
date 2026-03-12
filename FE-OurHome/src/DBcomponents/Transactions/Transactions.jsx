import React, { useEffect, useState } from "react";
import { fetchAllTransactions } from '../../services/payService';
import "./AdminTransactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    transactionCode: "",
    status: "",
    paymentDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchAllTransactions(
          filters.transactionCode,
          filters.status,
          filters.paymentDate
      );
      setTransactions(data);
      setCurrentPage(1); // Reset page on search
    } catch (error) {
      alert("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    loadTransactions();
  };

  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 4; // First 2 + Last 2

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is 4 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => paginate(i)}
                className={`admin-pagination-button ${currentPage === i ? 'admin-active' : ''}`}
            >
              {i}
            </button>
        );
      }
    } else {
      // Show first 2 pages
      for (let i = 1; i <= 2; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => paginate(i)}
                className={`admin-pagination-button ${currentPage === i ? 'admin-active' : ''}`}
            >
              {i}
            </button>
        );
      }

      // Add ellipsis if needed
      if (currentPage > 3 || totalPages > 5) {
        pages.push(<span key="start-ellipsis" className="admin-pagination-ellipsis">...</span>);
      }

      // Add last 2 pages
      for (let i = totalPages - 1; i <= totalPages; i++) {
        if (i > 2) { // Avoid duplicating pages 1 and 2
          pages.push(
              <button
                  key={i}
                  onClick={() => paginate(i)}
                  className={`admin-pagination-button ${currentPage === i ? 'admin-active' : ''}`}
              >
                {i}
              </button>
          );
        }
      }
    }

    return pages;
  };

  return (
      <div className="admin-transactions p-4">
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

        {/* Filter Section */}
        <div className="transaction-view-toggle">
          <div className="transaction-search-container">
            <input
                type="text"
                name="transactionCode"
                placeholder="Transaction Code"
                value={filters.transactionCode}
                onChange={handleInputChange}
                className="transaction-search-input"
            />
            <button
                onClick={handleSearch}
                className="transaction-search-btn"
            >
              Search
            </button>
            <input
                type="date"
                name="paymentDate"
                value={filters.paymentDate}
                onChange={handleInputChange}
                className="transaction-search-input transaction-search-input-date"
            />

          </div>
          <div className="transaction-filter-container">
            <select
                name="status"
                value={filters.status}
                onChange={handleInputChange}
                className="transaction-filter-select"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Success">Success</option>
            </select>
          </div>
          <div className="1-transaction-filter-container">
            <select
                value={itemsPerPage}
                onChange={handlePageSizeChange}
                className="transaction-filter-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>


        {/* Table */}
        {loading ? (
            <div className="text-center py-4">Loading transactions...</div>
        ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Transaction Code</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Membership ID</th>
                  <th className="px-4 py-2 border">Amount (VND)</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Payment Date</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map((tx) => (
                        <tr key={tx.paymentId} className="text-center">
                          <td className="px-4 py-2 border">{tx.paymentId}</td>
                          <td className="px-4 py-2 border">{tx.transactionCode}</td>
                          <td className="px-4 py-2 border">{tx.userId}</td>
                          <td className="px-4 py-2 border">{tx.membershipId || "N/A"}</td>
                          <td className="px-4 py-2 border">{tx.amount?.toLocaleString()}</td>
                          <td className={`px-4 py-2 border font-semibold admin-status-${tx.status?.toLowerCase()}`}>
                            {tx.status}
                          </td>
                          <td className="px-4 py-2 border">{tx.paymentDate?.slice(0, 10)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-2">
                        No transactions found.
                      </td>
                    </tr>
                )}
                </tbody>
              </table>

              {/* Pagination Summary & Controls */}
              <div className="admin-pagination-controls mt-4 flex items-center justify-between flex-wrap">
                <span className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, transactions.length)} of {transactions.length}
                </span>
                <div className="admin-pagination flex gap-2 mt-2">
                  <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="admin-pagination-button"
                  >
                    Previous
                  </button>
                  {renderPagination()}
                  <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="admin-pagination-button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Transactions;