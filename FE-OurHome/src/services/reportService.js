import axios from 'axios';

// Cấu hình base URL cho API
const API_URL = 'http://localhost:8082/api/reports';

// Hàm tạo báo cáo mới
export const createReport = async (reportDTO) => {
    try {
        const response = await axios.post(`${API_URL}`, reportDTO, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating report:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Failed to create report');
    }
};

// Hàm lấy tất cả báo cáo (cho admin)
export const getAllReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin`);
        console.log("Report BE",response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw new Error(error.response?.data || 'Failed to fetch reports');
    }
};

// Hàm cập nhật trạng thái báo cáo
export const updateReportStatus = async (reportId, status) => {
    try {
        const response = await axios.put(`${API_URL}/${reportId}/status`, { status }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating report status:', error);
        throw new Error(error.response?.data || 'Failed to update report status');
    }
};

export const softDeleteReport = async (reportId) => {
    try {
        const response = await axios.put(`${API_URL}/${reportId}/delete`, {
            status: 'deleted'
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete report: ' + (error.response?.data || error.message));
    }
};
