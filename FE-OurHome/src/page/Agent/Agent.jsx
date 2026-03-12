import React, { useEffect, useState } from "react";
import { getAllSellers } from "../../services/SellerService";
import { Link } from "react-router-dom";
import "./Agent.css"; // import CSS thuần
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import DefaultAvatar from "../../Assets/img/DefaultAvatar.jpg";

export default function SellerList() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const data = await getAllSellers();
        setSellers(data);
        console.log("Data from API:", data);
      } catch (err) {
        setError("Không thể tải danh sách sellers.");
      } finally {
        setLoading(false);
      }
    }
    fetchSellers();
  }, []);

  if (loading) return <p className="sellerlist-loading">Đang tải dữ liệu...</p>;
  if (error) return <p className="sellerlist-error">{error}</p>;
  if (sellers.length === 0)
    return <p className="sellerlist-empty">Chưa có seller nào.</p>;

  return (
      <div className="sellerlist-root">
        <Header />
        <div className="agent-warrap-content">
          <main className="sellerlist-main">
            <h2 className="sellerlist-title">Our Agents</h2>
            <div className="sellerlist-card-container">
              {sellers.map((seller) => (
                  <Link
                      to={`/agent-property/${seller.userID}`}
                      key={seller.userID}
                      className="sellerlist-card-link"
                  >
                    <div className="sellerlist-card">
                      <img
                          src={seller.imgPath || DefaultAvatar}
                          alt={`${seller.firstName} ${seller.lastName}`}
                          className="sellerlist-card-image"
                      />
                      <div className="sellerlist-card-name">
                        {seller.firstName} {seller.lastName}
                      </div>
                      <button className="sellerlist-contact-btn">📞</button>
                    </div>
                  </Link>
              ))}
            </div>
          </main>
        </div>
        <Footer />
      </div>
  );
}