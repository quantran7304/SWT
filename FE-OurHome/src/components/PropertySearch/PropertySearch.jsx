import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaBath, FaBed, FaExpand, FaMapMarkerAlt } from "react-icons/fa";
import "./PropertySearch.css";


export default function PropertySearch() {
  const navigate = useNavigate();
  const location = useLocation();


  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6); // Number of properties per page


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      city: params.get("city") || "",
      propertyType: params.get("propertyType") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      minArea: params.get("minArea") || "",
      maxArea: params.get("maxArea") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
    };
    setFilters(newFilters);


    setLoading(true);
    axios
        .get("http://localhost:8082/api/listing/search", { params: newFilters })
        .then((res) => {
          setProperties(res.data);
          setLoading(false);
          setCurrentPage(1); // Reset to first page on new search
        })
        .catch((err) => {
          setError("Error loading data: " + err.message);
          setLoading(false);
        });
  }, [location.search]);


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };


  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`?${params.toString()}`);
  };


  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);


  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
      <section className="search-featured-section">
        <div className="search-form">
          <div className="search-form-grid">
            <h6><i className="bi bi-funnel"></i> Filters</h6>
            <h2>Search Properties</h2>
            <input
                name="city"
                placeholder="Enter address or city"
                value={filters.city}
                onChange={handleChange}
            />
            <h2>Property Type</h2>
            <input
                name="propertyType"
                placeholder="Enter property type"
                value={filters.propertyType}
                onChange={handleChange}
            />
            <h2>Min Price</h2>
            <input
                name="minPrice"
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleChange}
            />
            <h2>Max Price</h2>
            <input
                name="maxPrice"
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleChange}
            />
            <h2>Min Area</h2>
            <input
                name="minArea"
                type="number"
                placeholder="Min Area (m²)"
                value={filters.minArea}
                onChange={handleChange}
            />
            <h2>Max Area</h2>
            <input
                name="maxArea"
                type="number"
                placeholder="Max Area (m²)"
                value={filters.maxArea}
                onChange={handleChange}
            />
            <h2>Bedrooms</h2>
            <input
                name="bedrooms"
                type="number"
                placeholder="Number of bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
            />
            <h2>Bathrooms</h2>
            <input
                name="bathrooms"
                type="number"
                placeholder="Number of bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>


        {loading ? (
            <div className="search-loading">Loading...</div>
        ) : error ? (
            <div className="search-error">{error}</div>
        ) : (
            <>
              <div className="search-properties-grid">
                {currentProperties.map((item) => (
                    <Link
                        to={`/property/${item.propertyID || item.propertyId}`}
                        key={item.propertyID || item.propertyId}
                        className="search-property-card"
                    >
                      <div className="search-image-wrapper">
                        <img
                            src={item.imgURL || "/fallback.jpg"}
                            alt={item.addressLine1}
                        />
                        <div className="search-badges">
                    <span
                        className={`search-badge ${
                            item.purpose === "buy"
                                ? "search-for-sale"
                                : "search-for-rent"
                        }`}
                    >
                      {item.purpose === "buy" ? "FOR SALE" : "FOR RENT"}
                    </span>
                          {item.isFeatured && (
                              <span className="search-badge search-featured">
                        FEATURED
                      </span>
                          )}
                        </div>
                        <div className="search-property-detail-info-overlay">
                          <h3>{item.addressLine1}</h3>
                          <p>
                            <FaMapMarkerAlt /> {item.addressLine1}, {item.city}
                          </p>
                          <strong>${item.price}</strong>
                          <div className="search-property-info">
                      <span>
                        <FaBed /> {item.numBedroom}
                      </span>
                            <span>
                        <FaBath /> {item.numBathroom}
                      </span>
                            <span>
                        <FaExpand /> {item.area} m²
                      </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
              <div className="pagination" style={{ marginTop: '40px', marginLeft:'430px' }}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ margin: '0 5px', padding: '5px 10px' }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{
                          margin: '0 5px',
                          padding: '5px 10px',
                          backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
                          color: currentPage === index + 1 ? '#fff' : '#000',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                        }}
                    >
                      {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ margin: '0 5px', padding: '5px 10px' }}
                >
                  Next
                </button>
              </div>
            </>
        )}
      </section>
  );
}

