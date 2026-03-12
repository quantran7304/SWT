import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PayOSIntegration = ({ plan, onSuccess }) => {
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const getUserDataFromLocalStorage = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                if (parsedData.email && emailRegex.test(parsedData.email)) {
                    return {
                        email: parsedData.email,
                        name: `${parsedData.firstName || ''} ${parsedData.lastName || ''}`.trim(),
                        id: parsedData.id,
                    };
                }
            } catch (e) {
                console.error('Error parsing userData from localStorage:', e);
            }
        }
        return null;
    };

    useEffect(() => {
        const initiatePayment = async () => {
            if (!plan || !plan.id) {
                console.error('Invalid plan or membershipId:', plan);
                toast.error('Invalid plan selected. Please try again.', { position: 'top-right', autoClose: 3000 });
                navigate('/membership');
                return;
            }

            const userData = getUserDataFromLocalStorage();
            if (!userData) {
                toast.error('User not logged in. Please log in.', { position: 'top-right', autoClose: 3000 });
                navigate('/login');
                return;
            }

            try {
                const orderCode = Date.now().toString();
                const baseDescription = "P from ";
                const maxNameLength = 24 - baseDescription.length;
                const truncatedName = userData.name.length > maxNameLength ? userData.name.slice(0, maxNameLength) : userData.name;
                const description = `${baseDescription}${truncatedName}`.slice(0, 24);

                const payload = {
                    orderCode,
                    amount: Math.floor(plan.price),
                    description,
                    email: userData.email,
                    membershipId: plan.id.toString(), // Đảm bảo membershipId là chuỗi
                };

                console.log('Payload sent to backend:', payload); // Log payload trước khi gửi

                const response = await fetch('http://localhost:8082/api/payment/initiate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (data.paymentUrl) {
                    const urlWithParams = `${data.paymentUrl}&email=${encodeURIComponent(userData.email)}&amount=${plan.price}&membershipId=${plan.id}`;
                    window.location.href = urlWithParams;
                    if (onSuccess) onSuccess(urlWithParams);
                    toast.success('Payment initiated successfully!', { position: 'top-right', autoClose: 3000 });
                } else if (data.error) {
                    toast.error(`Payment initiation failed: ${data.error}`, { position: 'top-right', autoClose: 3000 });
                }
            } catch (error) {
                console.error('Error initiating payment:', error);
                toast.error('An error occurred. Please try again.', { position: 'top-right', autoClose: 3000 });
            }
        };

        initiatePayment();
    }, [plan, navigate, onSuccess]);

    return null;
};

export default PayOSIntegration;