import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import './PropertyDetails.css';
import ImageGallery from '../../page/ImageGallery/ImageGallery';
import { createContact } from "../../services/contactService";
import { addToFavourite } from "../../services/cusomerService";
import { getWishlist } from "../../services/favouriteService";
import { createReport } from "../../services/reportService"; // Thêm import service báo cáo
import { toast } from 'react-toastify';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false); // Trạng thái kiểm tra wishlist
  const [isReportOpen, setIsReportOpen] = useState(false); // Trạng thái cho khung báo cáo
  const [reportReason, setReportReason] = useState(''); // Lý do báo cáo
  const pricingRef = useRef(null);
  const propertyDetailsRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const [reportDetail, setReportDetail] = useState(''); // For textarea input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailRes, listingRes] = await Promise.all([
          axios.get(`http://localhost:8082/api/listing/${id}`),
          axios.get(`http://localhost:8082/api/listings/${id}`)
        ]);

        const detail = detailRes.data;
        const listing = listingRes.data;
        console.log(listing);

        setProperty({
          propertyID: detail.propertyID,
          title: detail.addressLine1 || 'No title available',
          addressLine1: detail.addressLine1,
          addressLine2: detail.addressLine2,
          location: `${detail.region || ''}, ${detail.city || ''}`,
          city: detail.city,
          region: detail.region,
          price: detail.price || 'Contact for price',
          image: detail.imgURL,
          images: detail.images || [],
          type: detail.propertyType,
          purpose: detail.purpose,
          area: detail.area,
          interior: detail.interior,
          bedrooms: detail.numBedroom,
          compares: detail.numCompares,
          bathrooms: detail.numBathroom,
          floor: detail.floor,
          privatePool: detail.privatePool,
          landType: detail.landType,
          legalStatus: detail.legalStatus,
          description: listing.description || '',
          amenities: [
            detail.numBedroom > 0 ? 'Bedroom' : null,
            detail.numBathroom > 0 ? 'Bathroom' : null,
            detail.privatePool ? 'Private Pool' : null,
            'TV',
            'Washing machine',
          ].filter(Boolean),
        });
      } catch (error) {
        console.error('Error fetching property or listing:', error);
        setError('Unable to load data.');
      } finally {
        setLoading(false);
      }
    };

    const checkWishlist = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user"));
        const userId = stored?.id;
        if (userId) {
          const wishlistData = await getWishlist(userId);
          const isInList = wishlistData.some(item => item.property?.propertyID === parseInt(id));
          setIsInWishlist(isInList);
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
      }
    };

    fetchData();
    checkWishlist();

    const handleScroll = () => {
      const pricingElement = pricingRef.current;
      const propertyDetailsElement = propertyDetailsRef.current;
      const footerElement = footerRef.current;
      if (pricingElement && propertyDetailsElement && footerElement) {
        const propertyDetailsRect = propertyDetailsElement.getBoundingClientRect();
        const pricingRect = pricingElement.getBoundingClientRect();
        const footerRect = footerElement.getBoundingClientRect();

        const navbarHeight = 64;
        const gap = 16;
        const topOffset = navbarHeight + gap;

        const propertyDetailsTop = propertyDetailsRect.top + window.scrollY;
        const propertyDetailsBottom = propertyDetailsRect.bottom + window.scrollY;
        const footerTop = footerRect.top + window.scrollY;

        const pricingHeight = pricingRect.height;

        if (window.scrollY <= propertyDetailsTop) {
          pricingElement.style.position = 'static';
        } else if (window.scrollY > propertyDetailsTop) {
          const maxStickyBottom = Math.min(propertyDetailsBottom, footerTop) - pricingHeight - topOffset;
          if (window.scrollY < maxStickyBottom) {
            pricingElement.style.position = 'sticky';
            pricingElement.style.top = `${topOffset}px`;
          } else {
            pricingElement.style.position = 'absolute';
            pricingElement.style.top = `${maxStickyBottom - window.scrollY + pricingHeight}px`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div>Property not found</div>;

  const fullAddress = [
    property.addressLine1,
    property.addressLine2,
    property.region,
    property.city,
    'Vietnam'
  ].filter(Boolean).join(', ');

  const handleBooking = async () => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (!stored?.id) {
      toast.error("⚠️ You must sign in before booking");

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      return;
    }

    try {
      const userId = stored.id;
      console.log("🔐 UserID :", userId);

      const result = await createContact(userId, parseInt(id));

      if (result.success) {
        console.log("✅ Booking thành công:", result);
        setTimeout(() => {
          window.location.href = "zalo://conversation?phone=0375523715";
        }, 100);
      } else {
        console.warn("⚠️ Booking thất bại:", result.message);
        toast.warn(result.message || "Không thể đặt booking.");
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API booking:", {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
      });
      toast.error("Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại.");
    }
  };

  const addToWishlist = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      const userId = stored?.id;
      if (!userId) {
        alert("Please log in to add to wishlist.");
        navigate('/login');
        return;
      }
      const response = await addToFavourite(userId, id);
      if (response.success) {
        alert("Property added to wishlist successfully!");
        setIsInWishlist(true); // Cập nhật trạng thái khi thêm thành công
      } else {
        alert("Failed to add to wishlist: " + response.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("An error occurred while adding to wishlist.");
    }
  };

  const handleReport = () => {
    setIsReportOpen(true); // Mở khung báo cáo
  };



    const handleSubmitReport = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem('user'));
        const userId = stored?.id;
        if (!userId || !reportReason.trim()) {
          alert('Please log in and select a reason for reporting.');
          return;
        }
        const reportDTO = {
          userId: userId,
          propertyId: parseInt(id),
          reportReason: reportReason, // Selected reason
          reportDetail: reportDetail || reportReason, // Detailed description or fallback to reason
        };
        console.log('Report DTO:', reportDTO);
        const response = await createReport(reportDTO); // Call service
        if (response) {
          alert(`Report submitted for property ID ${id} with reason: ${reportReason}`);
          setIsReportOpen(false);
          setReportReason('');
          setReportDetail('');
        } else {
          alert('Failed to submit report');
        }
      } catch (error) {
        console.error('Error submitting report:', error);
        alert('An error occurred while submitting the report. Please check the console for details.');
      }
    };

  return (
      <>
        <Navbar />
        <div className="container property-details" ref={propertyDetailsRef}>
          {isReportOpen && (
              <div className="report-overlay">
                <div className="report-modal">
                  <h3>Report Property</h3>
                  <div className="report-options">
                    <button onClick={() => setReportReason('Inappropriate content')}>
                      Inappropriate content
                    </button>
                    <button onClick={() => setReportReason('Fraud or scam')}>
                      Fraud or scam
                    </button>
                    <button onClick={() => setReportReason('Other issues')}>
                      Other issues
                    </button>
                  </div>
                  <textarea
                      value={reportDetail}
                      onChange={(e) => setReportDetail(e.target.value)}
                      placeholder="Please provide a detailed reason..."
                      rows="4"
                  />
                  <div className="report-actions">
                    <button onClick={handleSubmitReport}>Submit Report</button>
                    <button onClick={() => setIsReportOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
          )}
          <div className="property-main row">
            <div className="property-main-left col-lg-8 col-md-12">
              {property.images.length > 0 && <ImageGallery images={property.images} />}
              <div className="property-info1">
                <div className="property-info1-meta">
                  <h1>{property.title}</h1>
                  <div className="location">
                    <i className="bi bi-geo-alt me-2"></i> {property.location}
                  </div>
                </div>
                <div className="details">
                  {property.bedrooms > 0 && (
                      <span><i className="fas fa-bed"></i>{property.bedrooms} Bedrooms</span>
                  )}
                  {property.bathrooms > 0 && (
                      <span><i className="bi bi-droplet"></i>{property.bathrooms} Bathrooms</span>
                  )}
                  <span><i className="bi bi-rulers"></i>{property.area} m²</span>
                  {property.floor && (
                      <span><i className="bi bi-building"></i>{property.floor}th Floor</span>
                  )}
                </div>
                <div className="property-actions">
                <span
                    className="wishlist-icon"
                    onClick={addToWishlist}
                    style={{
                      width: '30px',
                      height: '30px',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      backgroundColor: isInWishlist ? 'red' : 'transparent',
                      border: isInWishlist ? 'none' : '2px solid white',
                      color: isInWishlist ? 'white' : 'black',
                      cursor: 'pointer'
                    }}
                >
                  <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </span>
                  <span
                      className="report-icon"
                      onClick={handleReport}
                      style={{
                        width: '30px',
                        height: '30px',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        backgroundColor: 'transparent',
                        border: '2px solid #ccc',
                        color: '#000',
                        cursor: 'pointer',
                        marginLeft: '10px'
                      }}
                  >
                  <i className="bi bi-flag"></i>
                </span>
                </div>
              </div>

              <div className="property-description">
                <h2>Description</h2>
                {property.description.split('\n').map((line, i) => (
                    line.trim() && (
                        <p key={i}>
                          • {line.trim()}
                        </p>
                    )
                ))}
              </div>

              <div className="property-full-details">
                <h2>Property Details</h2>
                <div className="details-grid">
                  <div className="detail-item"><strong>Address:</strong> {property.addressLine1} {property.addressLine2 && `, ${property.addressLine2}`}</div>
                  <div className="detail-item"><strong>Area:</strong> {property.location}</div>
                  <div className="detail-item"><strong>Type:</strong> {property.type}</div>
                  <div className="detail-item"><strong>Purpose:</strong> {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}</div>
                  <div className="detail-item"><strong>Size:</strong> {property.area} m²</div>
                  <div className="detail-item"><strong>Bedrooms:</strong> {property.bedrooms}</div>
                  <div className="detail-item"><strong>Bathrooms:</strong> {property.bathrooms}</div>
                  <div className="detail-item"><strong>Floor:</strong> {property.floor}</div>
                  <div className="detail-item"><strong>Private Pool:</strong> {property.privatePool ? 'Yes' : 'No'}</div>
                  <div className="detail-item"><strong>Land Type:</strong> {property.landType}</div>
                  <div className="detail-item"><strong>Legal Status:</strong> {property.legalStatus}</div>
                </div>
              </div>

              <div className="amenities">
                <h2>Amenities</h2>
                <div className="amenities-list">
                  {property.amenities.map((a, i) => <span key={i}>{a}</span>)}
                </div>
              </div>

              <div className="neighborhood">
                <h2>Neighborhood</h2>
                <p>Nearby restaurants, cafes, beaches...</p>
              </div>

              <div className="location-map">
                <h2>Location</h2>
                <iframe
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '8px' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                    title="Google Map"
                ></iframe>
              </div>
            </div>

            <div className="property-main-right col-lg-4 col-md-12" ref={pricingRef}>
              <div className="pricing">
                <div className="price">{property.price}</div>
                {property.purpose === 'rent' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ margin: 0 }}>Rent includes utilities</p>
                      {/*<input type="date" defaultValue="2025-06-10" style={{ width: '100%', maxWidth: '400px', marginBottom: '10px', marginTop: '10px' }} />*/}
                      {/*<input type="date" defaultValue="2025-07-10" style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }} />*/}
                      <button
                          style={{ width: 'fit-content', padding: '0.5rem 1rem' }}
                          onClick={handleBooking}>Continue Booking</button>
                    </div>
                ) : (
                    <div>
                      <p>One-time payment</p>
                      <button
                          style={{ width: 'fit-content', padding: '0.5rem 1rem' }}
                          onClick={handleBooking}>Continue Booking</button>
                    </div>
                )}
              </div>
            </div>
          </div>


        </div>
        <div className="footer-wrapper">
          <Footer ref={footerRef} />
        </div>
      </>
  );
};

export default PropertyDetails;