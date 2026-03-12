import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import { fetchMemberships } from '../../services/membershipService';

import './Membership.css';

const Membership = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const getColorByType = (type) => {
    switch (type.toUpperCase()) {
      case 'BASIC':
        return 'linear-gradient(135deg, #f7e4e1, #fff)';
      case 'PREMIUM':
        return 'linear-gradient(135deg, #e1f0e1, #fff)';
      case 'GOLD':
        return 'linear-gradient(135deg, #e1e8f0, #fff)';
      default:
        return '#ffffff';
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const roleId = query.get('roleId');
    if (roleId === '3') {
      setPaymentMessage('Payment successful! Your role has been upgraded to Seller.');
      localStorage.setItem('role', 'seller');
      navigate('/seller/dashboard');
    } else if (query.get('status') === 'CANCELLED') {
      setPaymentMessage('Payment was cancelled.');
    }
  }, [location, navigate]);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const data = await fetchMemberships();
        console.log('Fetched membership plans:', data);

        const formattedPlans = data.map((item) => {
          if (!item.membershipId) {
            console.error('Membership ID is missing for item:', item);
            return null;
          }
          return {
            id: item.membershipId,
            name: item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase(),
            price: parseFloat(item.price),
            priceString: `$${item.price}/month`,
            description: item.description,
            benefits: item.description.split(',').map(desc => desc.trim()),
            color: getColorByType(item.type),
          };
        }).filter(plan => plan !== null);

        setPlans(formattedPlans);
      } catch (error) {
        console.error('❌ Error fetching membership plans:', error);
        setPaymentMessage('Failed to load membership plans. Please try again.');
      }
    };

    getPlans();
  }, []);

  const handleChoosePlan = (plan) => {
    if (!plan || !plan.id) {
      console.error('Invalid plan selected:', plan);
      return;
    }
    console.log('Selected plan for payment:', plan); // Log plan được chọn
    const confirm = window.confirm(`Are you sure you want to choose the ${plan.name} plan?`);
    if (confirm) {
      navigate('/payos', { state: { plan } });
    }
  };

  const faqs = [
    { question: 'How do I register for a membership plan?', answer: 'Click on "Choose Plan" and follow the simple payment instructions.' },
    { question: 'Is there a refund available?', answer: 'No refunds are available after the first 7 days unless under special circumstances.' },
    { question: 'How can I upgrade my plan?', answer: 'Go to your account section and select "Upgrade Plan" to change immediately.' },
  ];

  return (
      <>
        <Navbar />
        <div className="membership-container">
          {paymentMessage && (
              <div className="payment-message" style={{ color: paymentMessage.includes('successful') ? 'green' : 'red', textAlign: 'center', margin: '20px 0' }}>
                {paymentMessage}
              </div>
          )}

          <div className="banner">
            <h1>Discover Membership Plans</h1>
            <p>Elevate your real estate business with us today!</p>
          </div>

          <div className="plans-section">
            <h2>Your Membership Plans</h2>
            <div className="plans-grid">
              {plans.map((plan, index) => (
                  <div key={index} className="plan-card" style={{ background: plan.color }}>
                    <div className="plan-header">
                      <h3>{plan.name}</h3>
                      <span className="plan-price">{plan.priceString}</span>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                    <ul className="plan-benefits">
                      {plan.benefits.map((benefit, i) => (
                          <li key={i}><span className="check-mark">✓</span> {benefit}</li>
                      ))}
                    </ul>
                    <button
                        className="plan-button"
                        onClick={() => handleChoosePlan(plan)}
                    >
                      Choose Plan
                    </button>
                  </div>
              ))}
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Membership;