import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllReports, updateReportStatus } from '../../services/reportService';
import "./ReportTable.css";
const ReportTable = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await getAllReports();

            // Sort: show "pending" first
            const sorted = data.sort((a, b) => {
                if (a.status === 'pending' && b.status !== 'pending') return -1;
                if (a.status !== 'pending' && b.status === 'pending') return 1;
                return new Date(b.reportDate) - new Date(a.reportDate); // fallback by date
            });

            setReports(sorted);
        } catch (error) {
            console.error('Error fetching reports:', error);
            alert('Failed to load reports. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const totalPages = Math.ceil(reports.length / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const currentReports = reports.slice(startIdx, startIdx + rowsPerPage);

    const handleView = (propertyId) => navigate(`/admin/dashboard/property/${propertyId}`);

    const handleBanListing = async (reportId) => {
        if (window.confirm(`Are you sure you want to resolve and ban the listing for report ID ${reportId}?`)) {
            try {
                await updateReportStatus(reportId, "Resolved");
                alert(`Report ID ${reportId} has been resolved and listing is hidden.`);
                fetchReports(); // Refresh list
            } catch (error) {
                console.error('Error updating report status:', error);
                alert('Failed to update report status.');
            }
        }
    };

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
                        className={`report-pagination-button ${currentPage === i ? 'report-active' : ''}`}
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
                        className={`report-pagination-button ${currentPage === i ? 'report-active' : ''}`}
                    >
                        {i}
                    </button>
                );
            }

            // Add ellipsis if needed
            if (totalPages > 5) {
                pages.push(<span key="start-ellipsis" className="report-pagination-ellipsis">...</span>);
            }

            // Add last 2 pages
            for (let i = totalPages - 1; i <= totalPages; i++) {
                if (i > 2) { // Avoid duplicating pages 1 and 2
                    pages.push(
                        <button
                            key={i}
                            onClick={() => paginate(i)}
                            className={`report-pagination-button ${currentPage === i ? 'report-active' : ''}`}
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pages;
    };

    if (loading) return <div className="p-4 text-center">Loading reports...</div>;

    return (
        <div className="p-4">

            <div className="report-view-toggle">
                <div className="filter-container">
                    <label className="filter-label">Rows per page:</label>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="filter-select"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 border">No.</th>
                    <th className="py-2 px-4 border">Property ID</th>
                    <th className="py-2 px-4 border">User ID</th>
                    <th className="py-2 px-4 border">Reason</th>
                    <th className="py-2 px-4 border">Detail</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentReports.map((report, index) => (
                    <tr key={report.reportId} className="text-center">
                        <td className="py-2 px-4 border">{startIdx + index + 1}</td>
                        <td className="py-2 px-4 border">{report.propertyId}</td>
                        <td className="py-2 px-4 border">{report.userId}</td>
                        <td className="py-2 px-4 border">{report.reportReason}</td>
                        <td className="py-2 px-4 border">{report.reportDetail}</td>
                        <td className="py-2 px-4 border">{report.reportDate}</td>
                        <td className="py-2 px-4 border capitalize">{report.status}</td>
                        <td className="py-2 px-4 border flex items-center justify-center gap-2">
                            <button onClick={() => handleView(report.propertyId)} title="View Details"><i className="bi bi-eye"></i></button>
                            <button onClick={() => handleBanListing(report.reportId)} title="Resolve & Ban"><i className="bi bi-ban"></i></button>
                        </td>
                    </tr>
                ))}
                {currentReports.length === 0 && (
                    <tr>
                        <td colSpan="8" className="py-2 px-4 border text-center">No reports found.</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="report-pagination-controls mt-4 flex items-center justify-between flex-wrap">
                <span className="text-sm text-gray-600">
                    Showing {startIdx + 1} - {Math.min(startIdx + rowsPerPage, reports.length)} of {reports.length}
                </span>
                <div className="report-pagination flex gap-2 mt-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="report-pagination-button"
                    >
                        Previous
                    </button>
                    {renderPagination()}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="report-pagination-button"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportTable;