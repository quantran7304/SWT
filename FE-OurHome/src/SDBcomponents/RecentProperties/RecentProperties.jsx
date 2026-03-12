import React, { useState, useEffect } from "react";
import "./RecentProperties.css";
import SellerService from "../../services/SellerService";
import propertyService from "../../services/propertyService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const truncate = (str, maxLength = 30) => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

const RecentProperties = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  // Retrieve userId from localStorage
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).id : null;

  useEffect(() => {
    const fetchListings = async () => {
      if (!userId) {
        console.error("User ID is missing. Please log in.");
        return;
      }
      try {
        const data = await SellerService.getListingsByUserId(userId);
        console.log("API Response - Number of properties:", data.properties);
        console.log("API Response - Number of listings:", data.listings);
        const mappedListings = data.listings.map((listing) => {
          const property = data.properties.find((prop) => String(prop.propertyID) === String(listing.propertyId)) || {};
          return { ...listing, property };
        });
        setListings(mappedListings);
        console.log("Total mapped listings:", mappedListings.length);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    fetchListings();
  }, [userId]);

  const handleEdit = (id) => {
    navigate(`/seller/dashboard/property/form/${id}`);
  };

  const handleDelete = async (propertyId) => {
    const result = await Swal.fire({
      title: "Are you sure to delete property?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await propertyService.deleteProperty(propertyId, userId);
        setListings(listings.filter((listing) => listing.property.propertyID !== propertyId));
        Swal.fire("Deleted!", "Property has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  const handleCreateNew = () => {
    navigate("/seller/dashboard/property/new");
  };

  // Pagination logic
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const paginatedListings = listings.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
      <div className="seller-recent-properties">
        <h2>
          Recent Properties <span>({listings.length} properties)</span>
        </h2>
        <button
            className="seller-action-btn create"
            onClick={handleCreateNew}
            title="Create new"
            style={{ width: "100px", height: "40px", backgroundColor: "#4CAF50", color: "#fff", borderRadius:"12px" , float: "right"}}
        >
          <FontAwesomeIcon icon={faPlus} /> Create new
        </button>
        {listings.length === 0 ? (
            <p>No properties found for user ID: {userId}. Please check the data.</p>
        ) : (
            <>
              <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
              >
                <label>
                  Show
                  <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      style={{ margin: "0 8px" }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                  items
                </label>

              </div>
              <div className="seller-properties-table">
                <table>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Property Type</th>
                    <th>Purpose</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {paginatedListings.map((listing, index) => (
                      <tr key={listing.listingId}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td
                            title={[
                              listing.property.addressLine1,
                              listing.property.addressLine2,
                              listing.property.region,
                              listing.property.city,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        >
                          {truncate(
                              [
                                listing.property.addressLine1,
                                listing.property.addressLine2,
                                listing.property.region,
                                listing.property.city,
                              ]
                                  .filter(Boolean)
                                  .join(", "),
                              30
                          )}
                        </td>
                        <td>
                          {truncate(
                              listing.property.area
                                  ? listing.property.area.toString()
                                  : "N/A",
                              10
                          )}
                        </td>
                        <td>{truncate(listing.property.propertyType || "N/A", 15)}</td>
                        <td>{truncate(listing.property.purpose || "N/A", 15)}</td>
                        <td>
                          <button
                              className="seller-action-btn view"
                              title="View details"
                              onClick={() =>
                                  navigate(`/seller/dashboard/property/${listing.property.propertyID}`)
                              }
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button
                              className="seller-action-btn edit"
                              onClick={() => handleEdit(listing.listingId)}
                              title="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                              className="seller-action-btn delete"
                              onClick={() => handleDelete(listing.property.propertyID)}
                              title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
                <div className="seller-table-footer">
                  Displaying {paginatedListings.length} out of {listings.length}{" "}
                  results - Current page: {currentPage}
                </div>
                <div
                    style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                      <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          style={{
                            margin: "0 4px",
                            padding: "4px 10px",
                            background: currentPage === i + 1 ? "#3ca267" : "#fff",
                            color: currentPage === i + 1 ? "#fff" : "#3ca267",
                            border: "1px solid #3ca267",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontWeight: currentPage === i + 1 ? 700 : 400,
                          }}
                      >
                        {i + 1}
                      </button>
                  ))}
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default RecentProperties;