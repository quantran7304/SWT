import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllProperties.css";
const AllProperties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8082/api/listing");
            console.log("Fetched properties:", response.data);

            // DÙNG truthy check (dùng được nếu là boolean hoặc string "true")
            const active = response.data.filter(p => p.listingStatus);

            setProperties(active);
            setFiltered(active);
        } catch (error) {
            console.error("Error fetching properties:", error);
            alert("Failed to load properties");
        } finally {
            setLoading(false);
        }
    };

    const banListing = async (propertyId) => {
        try {
            await axios.put(`http://localhost:8082/api/listing/status`, null, {
                params: {
                    propertyId: propertyId
                }
            });

            alert("Đã cập nhật trạng thái listing thành Ban");
            fetchProperties(); // refresh list
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert("Không thể cập nhật trạng thái listing.");
        }
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearch(keyword);
        const result = properties.filter(
            (item) =>
                item.addressLine1?.toLowerCase().includes(keyword) ||
                item.addressLine2?.toLowerCase().includes(keyword) ||
                item.city?.toLowerCase().includes(keyword)
        );
        setFiltered(result);
        setPage(1); // reset to first page
    };

    const handleLimitChange = (e) => {
        setLimit(parseInt(e.target.value));
        setPage(1); // reset to first page
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);
    const totalPages = Math.ceil(filtered.length / limit);

    // Handle page change
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
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
                        className={`prop-pagination-button ${page === i ? 'prop-active' : ''}`}
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
                        className={`prop-pagination-button ${page === i ? 'prop-active' : ''}`}
                    >
                        {i}
                    </button>
                );
            }

            // Add ellipsis if needed
            if (totalPages > 5) {
                pages.push(<span key="start-ellipsis" className="prop-pagination-ellipsis">...</span>);
            }

            // Add last 2 pages
            for (let i = totalPages - 1; i <= totalPages; i++) {
                if (i > 2) { // Avoid duplicating pages 1 and 2
                    pages.push(
                        <button
                            key={i}
                            onClick={() => paginate(i)}
                            className={`prop-pagination-button ${page === i ? 'prop-active' : ''}`}
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
        <div className="p-6">

            <div className="admin-view-toggle">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by address or city..."
                        value={search}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="1-search-btn">
                        Search
                    </button>
                </div>
                <div className="filter-container">
                    <label className="filter-label">Show:</label>
                    <select
                        value={limit}
                        onChange={handleLimitChange}
                        className="filter-select"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-4">Loading properties...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">STT</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border">Address</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginated.map((property, index) => (
                            <tr key={property.propertyID} className="text-center">
                                <td className="px-4 py-2 border">{start + index + 1}</td>
                                <td className="px-4 py-2 border">
                                    {(property.price)?.toLocaleString()} VND
                                </td>
                                <td className="px-4 py-2 border">
                                    {property.addressLine1}, {property.addressLine2}, {property.city}
                                </td>
                                <td className="px-4 py-2 border">{property.listingStatus?.toString()}</td>
                                <td className="px-4 py-2 border space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => navigate(`/admin/dashboard/property/${property.propertyID}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className={`text-white px-3 py-1 rounded hover:opacity-90 ${property.listingStatus ? 'bg-red-600' : 'bg-green-600'}`}
                                        onClick={() => banListing(property.propertyID)}
                                        title={property.listingStatus ? 'Click to ban' : 'Click to unban'}
                                    >
                                        <i className={`fas ${property.listingStatus ? 'fa-lock' : 'fa-lock-open'}`}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination control */}
                    <div className="prop-pagination-controls mt-4 flex items-center justify-between flex-wrap">
                        <span className="text-sm text-gray-600">
                            Showing {start + 1} - {Math.min(end, filtered.length)} of {filtered.length}
                        </span>
                        <div className="prop-pagination flex gap-2 mt-2">
                            <button
                                onClick={() => paginate(page - 1)}
                                disabled={page === 1}
                                className="prop-pagination-button"
                            >
                                Prev
                            </button>
                            {renderPagination()}
                            <button
                                onClick={() => paginate(page + 1)}
                                disabled={page === totalPages}
                                className="prop-pagination-button"
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

export default AllProperties;