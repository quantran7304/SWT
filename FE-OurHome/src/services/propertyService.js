import axios from "axios";

const API_URL = "http://localhost:8082/api";

export const getProperty = async (id) => {
    try {
        console.log("Fetching property:", id);
        const [detailRes, listingRes] = await Promise.all([
            axios.get(`${API_URL}/listing/${id}`),
            axios.get(`${API_URL}/listings/${id}`)
        ]);

        const detail = detailRes.data;
        const listing = listingRes.data;

        return {
            propertyID: detail.propertyID || "",
            title: detail.addressLine1 || "No title available",
            addressLine1: detail.addressLine1 || "",
            addressLine2: detail.addressLine2 || "",
            location: `${detail.region || ""}, ${detail.city || ""}`.trim() || "Unknown location",
            city: detail.city || "",
            region: detail.region || "",
            price: detail.price || "Contact for price",
            image: detail.imgURL || "",
            images: detail.images || [],
            type: detail.propertyType || "Unknown",
            purpose: detail.purpose || "Unknown",
            area: detail.area || 0,
            interior: detail.interior || "",
            bedrooms: detail.numBedroom || 0,
            compares: detail.numCompares || 0,
            bathrooms: detail.numBathroom || 0,
            floor: detail.floor || "",
            privatePool: detail.privatePool || false,
            landType: detail.landType || "",
            legalStatus: detail.legalStatus || "",
            description: listing.description || "",
            amenities: [
                detail.numBedroom > 0 ? "Bedroom" : null,
                detail.numBathroom > 0 ? "Bathroom" : null,
                detail.privatePool ? "Private Pool" : null,
                "TV",
                "Washing machine",
            ].filter(Boolean),
        };
    } catch (error) {
        console.error("Error fetching property or listing:", error);
        throw new Error("Không thể tải dữ liệu bất động sản");
    }
};

export const updateProperty = async (id, property) => {
    try {
        const response = await axios.put(`${API_URL}/listings/update/${id}`, property);
        return response.data;
    } catch (error) {
        console.error("Error updating property:", error);
        throw new Error("Có lỗi khi cập nhật dữ liệu bất động sản");
    }
};

export const createProperty = async (userID, formData) => {
    try {
        const response = await axios.post(`${API_URL}/listing/${userID}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating property:", error.response?.data || error.message);
        throw new Error(`Có lỗi khi tạo dữ liệu bất động sản: ${error.response?.status || 'Unknown'} - ${error.response?.data?.message || error.message}`);
    }
};

export const deleteProperty = async (id, userID) => {
    try {
        const response = await axios.delete(`${API_URL}/listing/${id}/${userID}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting property:", error);
        throw new Error("Có lỗi khi xóa dữ liệu bất động sản");
    }
};

export default {
    getProperty,
    updateProperty,
    createProperty,
    deleteProperty
};