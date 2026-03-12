
import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

// Headers mặc định với Authorization
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic YWRtaW46YWRtaW4xMjM=' // admin:admin123 mã hóa Base64
};

export const fetchAllTransactions = async (transactionCode, status, paymentDate) => {
    try {
        const response = await axios.get(`${API_URL}/payment/history/all`, {
            headers,
            params: {
                transactionCode,
                status,
                paymentDate,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        throw error;
    }
};


