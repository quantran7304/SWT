import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sale.module.css";
import Navbar from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import testpicture from "../../Assets/testpicture.jpg";
import bannerImage from "../../Assets/testpicture.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css';


const Sale = () => {
  const [filters, setFilters] = useState({
    search: "",
    purpose: "rent",
    bedrooms: "Any",
    bathrooms: "Any",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  const properties = [
    {
      id: 1,
      title: "Modern Apartment with Sea View",
      location: "Đà Nẵng",
      price: "8 million/month",
      image: testpicture,
      type: "Apartment",
      purpose: "rent",
      description: "A modern apartment with stunning sea views.",
      amenities: [
        "TV",
        "Fireplace",
        "Bedroom",
        "Bathroom",
        "Coffee machine",
        "Washing machine",
        "Iron",
        "Wardrobe",
      ],
      bedrooms: 2,
      bathrooms: 1,
      area: "500 sq ft",
      floor: "3rd Floor | Elevator",
    },
    {
      id: 2,
      title: "Luxury Villa near My Khe Beach",
      location: "Đà Nẵng",
      price: "25 million/month",
      image: testpicture,
      type: "Villa",
      purpose: "rent",
      description: "A luxurious villa with beach access.",
      amenities: ["TV", "Fireplace", "Bedroom", "Bathroom", "Coffee machine"],
      bedrooms: 4,
      bathrooms: 3,
      area: "1000 sq ft",
      floor: "Ground Floor",
    },
    {
      id: 3,
      title: "3BR House in Hoa Xuan, Cam Le",
      location: "Đà Nẵng",
      price: "2.8 billion VND",
      image: testpicture,
      type: "House",
      purpose: "buy",
      description: "A spacious 3-bedroom house.",
      amenities: ["TV", "Bedroom", "Bathroom", "Washing machine"],
      bedrooms: 3,
      bathrooms: 2,
      area: "700 sq ft",
      floor: "2 Floors",
    },
    {
      id: 4,
      title: "Beachside Land Plot – Ngu Hanh Son",
      location: "Đà Nẵng",
      price: "3.5 billion VND",
      image: testpicture,
      type: "Land",
      purpose: "buy",
      description: "A prime land plot near the beach.",
      amenities: [],
      bedrooms: 0,
      bathrooms: 0,
      area: "1000 sq ft",
      floor: "N/A",
    },
    {
      id: 5,
      title: "Penthouse Apartment – Ocean View",
      location: "Đà Nẵng",
      price: "6.2 billion VND",
      image: testpicture,
      type: "Apartment",
      purpose: "buy",
      description: "A luxurious penthouse with ocean views.",
      amenities: ["TV", "Fireplace", "Bedroom", "Bathroom", "Coffee machine", "Iron"],
      bedrooms: 3,
      bathrooms: 2,
      area: "800 sq ft",
      floor: "10th Floor | Elevator",
    },
  ];

  const filteredProperties = properties.filter((prop) => {
    return (
      prop.purpose === filters.purpose &&
      prop.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.bedrooms === "Any" || prop.bedrooms.toString() === filters.bedrooms) &&
      (filters.bathrooms === "Any" || prop.bathrooms.toString() === filters.bathrooms)
    );
  });

  return (
    <>
      <Navbar />
      <div className={styles.bannerSection}>
        <img
          src={bannerImage}
          alt="Banner"
          className={styles.bannerImage}
        />
        <div className={styles.bannerBar}>
          <div className={styles.bannerText}>
            <h1 className={styles.bannerTitle}>Rental Properties</h1>
            <p className={styles.propertiesCount}>
              {filteredProperties.length} properties available for {filters.purpose}
            </p>
          </div>
          <button
            className={styles.viewToggleButton}
            onClick={toggleView}
          >
            <i className={`bi ${isGridView ? "bi-grid-fill" : "bi-list-ul"}`}></i>
          </button>
        </div>
      </div>
      <div className={styles.saleContainer}>
        <div className={`${styles.filters} ${showFilters ? styles.filtersVisible : ""}`}>
          <h2>Filters</h2>
          <div className={styles.filterGroup}>
            <label>Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search rentals..."
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Purpose</label>
            <select
              name="purpose"
              value={filters.purpose}
              onChange={handleFilterChange}
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Bedrooms</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
            >
              <option>Any</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Bathrooms</label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
            >
              <option>Any</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>
          <button
            className={styles.clearFilters}
            onClick={() =>
              setFilters({
                search: "",
                purpose: "rent",
                bedrooms: "Any",
                bathrooms: "Any",
              })
            }
          >
            Clear Filters
          </button>
        </div>
        <div className={styles.propertiesList}>
          <button className={styles.showFiltersButton} onClick={toggleFilters}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className={`${styles.propertyGrid} ${isGridView ? styles.gridView : styles.listView}`}>
            {filteredProperties.map((prop) => (
              <div key={prop.id} className={styles.propertyCard}>
                <img src={prop.image || testpicture} alt={prop.title} />
                <div className={styles.propertyInfo}>
                  <span className={styles.status}>Available</span>
                  <span className={styles.type}>
                    {prop.bedrooms} Beds • {prop.bathrooms} Baths{" "}
                    {prop.parking ? "• Parking" : ""}
                  </span>
                  <h3>{prop.title}</h3>
                  <p>{prop.location}</p>
                  <p className={styles.price}>
                    {prop.price}{" "}
                    <span className={styles.deposit}>
                      Deposit: {prop.deposit || "N/A"}
                    </span>
                  </p>
                  <p className={styles.listedBy}>
                    Listed by {prop.listedBy || "Unknown"}
                  </p>
                  <p className={styles.description}>{prop.description}</p>
                  <div className={styles.propertyActions}>
                    <button
                      className={styles.viewDetails}
                      onClick={() => handleViewDetails(prop.id)}
                    >
                      View Details
                    </button>
                    <button className={styles.contactOwner}>Contact Owner</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sale;