import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PayOSIntegration = ({ name, email, amount, membershipType, onSuccess }) => {
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isPaymentReady, setIsPaymentReady] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const initiatePayment = async () => {
        if (!name || !email || !emailRegex.test(email)) {
            toast.error('Please enter a valid name and email address.', { position: 'top-right', autoClose: 3000 });
            return;
        }

        try {
            const orderCode = Date.now().toString();
            const baseDescription = "P from ";
            const maxNameLength = 24 - baseDescription.length;
            const truncatedName = name.length > maxNameLength ? name.slice(0, maxNameLength) : name;
            const description = `${baseDescription}${truncatedName}`.slice(0, 24);

            const response = await fetch('http://localhost:8082/api/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderCode, amount: Math.floor(amount), description, name, email, membershipType }),
            });

            const data = await response.json();
            if (data.paymentUrl) {
                const urlWithParams = `${data.paymentUrl}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&amount=${amount}${membershipType ? `&membershipType=${encodeURIComponent(membershipType)}` : ''}`;
                setPaymentUrl(urlWithParams);
                setIsPaymentReady(true);
                if (membershipType) {
                    localStorage.setItem('membershipType', membershipType.toLowerCase());
                    localStorage.setItem('userName', name); // Lưu tên người dùng
                }
                onSuccess(urlWithParams);
            } else if (data.error) {
                toast.error(`Payment initiation failed: ${data.error}`, { position: 'top-right', autoClose: 3000 });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', { position: 'top-right', autoClose: 3000 });
        }
    };

    const proceedToPayment = () => {
        if (paymentUrl) {
            window.open(paymentUrl, '_blank');
        }
    };

    return (
        <div>
            <button
                onClick={initiatePayment}
                className="btn btn-primary btn-lg w-100"
                disabled={!name || !email || !emailRegex.test(email)}
            >
                Pay with PayOS
            </button>
            {isPaymentReady && (
                <div className="text-center mt-3">
                    <button
                        onClick={proceedToPayment}
                        className="btn btn-success btn-proceed"
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default PayOSIntegration;