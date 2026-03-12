import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Thêm Link
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import './Wishlist.css';
import testPicture from '../../Assets/testpicture.jpg';
import { getWishlist, removeFromWishlist } from '../../services/favouriteService';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('user'));
  const userId = stored?.id;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!userId) {
          alert('Please log in to view your wishlist.');
          navigate('/login');
          return;
        }
        const data = await getWishlist(userId);
        setWishlist(data);
      } catch (err) {
        setError('Failed to load wishlist.');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [navigate]);

  const handleRemoveFromWishlist = async (favouriteId) => {
    try {
      const item = wishlist.find(item => item.favouriteId === favouriteId);
      const propertyId = item?.property?.propertyID;

      if (!userId || !propertyId) {
        setError('User or property information is missing.');
        return;
      }

      const success = await removeFromWishlist(favouriteId, userId, propertyId);
      if (success) {
        setWishlist(wishlist.filter(item => item.favouriteId !== favouriteId));
      } else {
        setError('Failed to remove item from wishlist.');
      }
    } catch (err) {
      setError('Failed to remove item from wishlist.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
      <>
        <Navbar />
        <div className="wishlist-container">
          {/* Header Banner */}
          <div className="banner">
            <h1>Your Wishlist</h1>
            <p>Manage your favorite properties here.</p>
          </div>

          {/* Wishlist Items */}
          <div className="wishlist-section">
            <h2>Your Favorite Properties</h2>
            {wishlist.length === 0 ? (
                <p className="empty-message">Your wishlist is empty. Start adding properties!</p>
            ) : (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                      <Link
                          to={`/property/${item.property?.propertyID}`} // Chuyển hướng đến PropertyDetails
                          key={item.favouriteId}
                          className="wishlist-item"
                          style={{ textDecoration: 'none', color: 'inherit' }} // Loại bỏ gạch chân và giữ màu mặc định
                      >
                        <img
                            src={item.property?.imgURL || item.property?.images?.[0] || testPicture}
                            alt={item.property?.addressLine1 || item.title}
                            className="wishlist-image"
                        />
                        <div className="wishlist-details">
                          <h3>{item.property?.addressLine1 || item.title}</h3>
                          <p className="wishlist-price">{item.property?.price || 'Price not available'}</p>
                          <p className="wishlist-location">
                            {[
                              item.property?.addressLine2,
                              item.property?.region,
                              item.property?.city,
                              'Vietnam'
                            ]
                                .filter(Boolean)
                                .join(', ') || item.location}
                          </p>
                          <button
                              className="remove-button"
                              onClick={(e) => {
                                e.preventDefault(); // Ngăn chặn chuyển hướng khi nhấp vào nút Remove
                                handleRemoveFromWishlist(item.favouriteId);
                              }}
                          >
                            Remove
                          </button>
                        </div>
                      </Link>
                  ))}
                </div>
            )}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Wishlist;