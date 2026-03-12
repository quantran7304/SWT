import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProperty } from "../../services/propertyService";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
import "./DBPropertyDetails.css";
import { JsonProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker from '../../Assets/marker.png';

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

const GOONG_API_KEY = 'aozR7FmVnnHExxmRENsapAsFwtLRBZiGLkSpvz1l'; // Replace with your actual Goong API key

class GoongProvider extends JsonProvider {
    endpoint({ query, type }) {
        return this.getUrl('https://rsapi.goong.io/Place/AutoComplete', {
            input: query,
            api_key: GOONG_API_KEY,
            more_compound: 'true',
        });
    }

    parse({ data }) {
        return data.predictions.map((prediction) => ({
            x: 0,
            y: 0,
            label: prediction.description,
            bounds: null,
            raw: prediction,
        }));
    }
}

function StreetAutocomplete({ onSelect, disabled }) {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const provider = new GoongProvider();

    useEffect(() => {
        console.log("StreetAutocomplete useEffect triggered with value:", value, "disabled:", disabled);
        if (!value || disabled) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const results = await provider.search({ query: value });
                console.log("Goong API results:", results);
                setSuggestions(results);
            } catch (err) {
                console.error("Error during search:", err);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [value, disabled]);

    const handleInput = (e) => {
        console.log("Input changed to:", e.target.value);
        setValue(e.target.value);
    };

    const handleSelect = async (suggestion) => {
        console.log("Selected suggestion:", suggestion);
        setValue(suggestion.label);
        setSuggestions([]);

        try {
            const results = await fetch(`https://rsapi.goong.io/Place/Detail?place_id=${suggestion.raw.place_id}&api_key=${GOONG_API_KEY}`);
            const detailData = await results.json();
            console.log("Goong Detail API response:", detailData);

            if (!detailData.result) {
                console.error("No result in response:", detailData);
                return;
            }

            const { lat, lng } = detailData.result.geometry.location;
            let street = "", ward = "", district = "", region = "";

            // Tách thủ công từ formatted_address
            if (detailData.result.formatted_address) {
                const addressParts = detailData.result.formatted_address.split(", ");
                street = addressParts[0] || ""; // Chỉ lấy phần đầu tiên làm street
                ward = addressParts[1] || "";   // Phần thứ hai là ward
                district = addressParts[2] || ""; // Phần thứ ba là district
                region = addressParts[3] || "";  // Phần thứ tư là region
                console.log("Extracted - street:", street, "ward:", ward, "district:", district, "region:", region);
            } else {
                console.warn("No formatted_address in response, using defaults");
            }

            console.log("Extracted street:", street, "ward:", ward, "district:", district, "region:", region);

            onSelect(suggestion.label, {
                street,
                ward,
                district,
                region,
                lat,
                lng
            });
        } catch (err) {
            console.error("Error during geocoding:", err);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <input
                value={value}
                onChange={handleInput}
                placeholder="Enter full address"
                style={{ width: "100%", padding: "8px" }}
                disabled={disabled}
            />
            {suggestions.length > 0 && (
                <ul
                    style={{
                        position: "absolute",
                        zIndex: 9999,
                        backgroundColor: "white",
                        listStyle: "none",
                        margin: 0,
                        padding: "4px",
                        border: "1px solid #ccc",
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            style={{ padding: "8px", cursor: "pointer" }}
                        >
                            {suggestion.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function DBPropertyCreate() {
    const navigate = useNavigate();
    const typeOptions = ["Apartment", "House", "Villa", "Condo"];
    const [provinces] = useState(getProvinces());
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [property, setProperty] = useState({
        addressLine1: "",
        addressLine2: "",
        region: "",
        city: "",
        type: "",
        purpose: "",
        area: "10",
        price: "",
        bedrooms: "",
        bathrooms: "",
        floor: "",
        privatePool: "false",
        landType: "",
        legalStatus: "",
        description: "",
        newImages: [],
    });
    const [newImages, setNewImages] = useState([]);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [location, setLocation] = useState({ lat: null, lng: null });
    const [showMap, setShowMap] = useState(false);
    const [fullAddress, setFullAddress] = useState("");
    const mapRef = useRef();
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    const userData = localStorage.getItem("user");
    const userID = userData ? JSON.parse(userData).id : null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Handle change:", name, "value:", value);
        setProperty((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        console.log("Image change triggered");
        const files = Array.from(e.target.files);
        console.log("Files received:", files);
        setNewImages((prev) => [...prev, ...files]);
    };

// Xử lý xóa ảnh
    const removeImage = (index) => {
        console.log("Removing image at index:", index);
        setNewImages((prev) => {
            const newImageToRemove = prev[index];
            const updatedImages = prev.filter((_, i) => i !== index);
            if (newImageToRemove.url) {
                setRemovedImages((prev) => [...prev, newImageToRemove.url]);
            }
            return updatedImages;
        });
        setProperty((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log("Handle save triggered with property:", property);
        setSaving(true);
        setErrors({});

        let hasError = false;
        const newErrors = {};

        if (!fullAddress) {
            newErrors.fullAddress = "Address is required";
            hasError = true;
        }
        if (!property.type) {
            newErrors.type = "Property type is required";
            hasError = true;
        }
        if (!property.purpose) {
            newErrors.purpose = "Purpose is required";
            hasError = true;
        }
        if (!property.area) {
            newErrors.area = "Area is required";
            hasError = true;
        }
        if (!property.price) {
            newErrors.price = "Price is required";
            hasError = true;
        }

        const areaNum = parseInt(property.area, 10);
        if (isNaN(areaNum) || areaNum < 10 || areaNum > 500) {
            newErrors.area = "Area must be a number between 10 and 500";
            hasError = true;
        }

        const priceNum = parseFloat(property.price);
        if (isNaN(priceNum) || priceNum <= 0) {
            newErrors.price = "Price must be a positive number";
            hasError = true;
        }

        if (property.bedrooms) {
            const bedroomsNum = parseInt(property.bedrooms, 10);
            if (isNaN(bedroomsNum) || bedroomsNum < 0) {
                newErrors.bedrooms = "Bedrooms must be a non-negative number";
                hasError = true;
            }
        }

        if (property.bathrooms) {
            const bathroomsNum = parseInt(property.bathrooms, 10);
            if (isNaN(bathroomsNum) || bathroomsNum < 0) {
                newErrors.bathrooms = "Bathrooms must be a non-negative number";
                hasError = true;
            }
        }

        if (hasError) {
            setErrors(newErrors);
            setSaving(false);
            return;
        }

        try {
            if (!userID) throw new Error("User ID is missing. Please log in.");

            const formData = new FormData();
            // Thêm các trường property (trừ images)
            Object.keys(property).forEach((key) => {
                if (key !== "images") {
                    formData.append(key, property[key]);
                }
            });
            // Thêm file từ newImages với key newImages[]
            newImages.forEach((image, index) => {
                formData.append(`newImages[${index}]`, image);
            });

            console.log("FormData entries:", Object.fromEntries(formData)); // Debug FormData
            await createProperty(userID, formData);
            alert("Tạo bài đăng thành công!");
            navigate("/seller/dashboard/property");
        } catch (err) {
            const errorMessage = err.message || "Có lỗi khi tạo bài đăng!";
            console.error("Error creating property:", err);
            alert(errorMessage);
            setErrors({ general: errorMessage });
        }
        setSaving(false);
    };

    useEffect(() => {
        console.log("Map useEffect triggered with showMap:", showMap, "location:", location);
        if (showMap && location.lat && location.lng) {
            if (mapRef.current && mapRef.current._leaflet_id != null) {
                mapRef.current._leaflet_id = null;
            }

            const map = L.map(mapRef.current).setView([location.lat, location.lng], 13);
            console.log("Map initialized at:", [location.lat, location.lng]);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Sử dụng marker tùy chỉnh từ file marker.jpg
            const customIcon = L.icon({
                iconUrl: marker,
                iconSize: [38, 38], // Kích thước của icon
                iconAnchor: [19, 38], // Điểm neo của icon (giữa đáy)
                popupAnchor: [0, -38] // Điểm neo của popup
            });

            L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);

            return () => {
                console.log("Cleaning up map");
                map.remove();
            };
        }
    }, [showMap, location]);

    return (
        <div className="db-property-details">

            <h2>Create New Property</h2>
            {errors.general && <div style={{ color: "red" }}>{errors.general}</div>}

            <form onSubmit={handleSave} className="db-property-edit-form" encType="multipart/form-data">
                <div className="details-grid">
                    <div>
                        <label>Address:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <StreetAutocomplete
                                    onSelect={(address, locationInfo = {}) => {
                                        console.log("Address selected:", address, "Location info:", locationInfo);
                                        const { street = "", ward = "", district = "", region = "", lat, lng } = locationInfo;

                                        setProperty(prev => ({
                                            ...prev,
                                            addressLine1: street, // Chỉ giữ "200 Thăng Long"
                                            addressLine2: ward,   // Điền ward
                                            city: district,       // Điền district
                                            region: region,       // Điền region
                                        }));

                                        if (lat && lng) {
                                            setLocation({ lat, lng });
                                            setShowMap(true); // Tự động hiển thị bản đồ
                                        }
                                        setFullAddress(address);
                                    }}
                                />
                            </div>
                            {location.lat && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log("Map button clicked, setting showMap to true");
                                        setShowMap(true);
                                    }}
                                    style={{ marginLeft: '10px', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    🗺️
                                </button>
                            )}
                        </div>
                        {errors.fullAddress && <div style={{ color: "red" }}>{errors.fullAddress}</div>}
                    </div>

                    <div>
                        <label>Ward:</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={property.addressLine2}
                            readOnly
                            style={errors.addressLine2 ? { border: "1px solid red" } : {}}
                        />
                    </div>

                    <div>
                        <label>District:</label>
                        <input
                            type="text"
                            name="city"
                            value={property.city}
                            readOnly
                            style={errors.city ? { border: "1px solid red" } : {}}
                        />
                    </div>

                    <div>
                        <label>Region:</label>
                        <input
                            type="text"
                            name="region"
                            value={property.region}
                            readOnly
                            style={errors.region ? { border: "1px solid red" } : {}}
                        />
                    </div>

                    <div>
                        <label>Street:</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={property.addressLine1}
                            readOnly
                            style={errors.addressLine1 ? { border: "1px solid red" } : {}}
                        />
                    </div>

                    <div>
                        <label>Property Type:</label>
                        <select
                            name="type"
                            value={property.type}
                            onChange={handleChange}
                            required
                            style={errors.type ? { border: "1px solid red" } : {}}
                        >
                            <option value="">Select type</option>
                            {typeOptions.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        {errors.type && <div style={{ color: "red" }}>{errors.type}</div>}
                    </div>

                    <div>
                        <label>Purpose:</label>
                        <select
                            name="purpose"
                            value={property.purpose}
                            onChange={handleChange}
                            required
                            style={errors.purpose ? { border: "1px solid red" } : {}}
                        >
                            <option value="">Select purpose</option>
                            <option value="rent">For Rent</option>
                            <option value="sale">For Sale</option>
                        </select>
                        {errors.purpose && <div style={{ color: "red" }}>{errors.purpose}</div>}
                    </div>

                    <div>
                        <label>Area (m²):</label>
                        <input
                            type="range"
                            name="area"
                            min="10"
                            max="500"
                            value={property.area}
                            onChange={handleChange}
                            style={errors.area ? { border: "1px solid red" } : {}}
                        />
                        <span>{property.area} m²</span>
                        {errors.area && <div style={{ color: "red" }}>{errors.area}</div>}
                    </div>

                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={property.price}
                            onChange={handleChange}
                            min="0"
                            required
                            style={errors.price ? { border: "1px solid red" } : {}}
                        />
                        {errors.price && <div style={{ color: "red" }}>{errors.price}</div>}
                    </div>

                    <div>
                        <label>Bedrooms:</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={property.bedrooms}
                            onChange={handleChange}
                            min="0"
                            style={errors.bedrooms ? { border: "1px solid red" } : {}}
                        />
                        {errors.bedrooms && <div style={{ color: "red" }}>{errors.bedrooms}</div>}
                    </div>

                    <div>
                        <label>Bathrooms:</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={property.bathrooms}
                            onChange={handleChange}
                            min="0"
                            style={errors.bathrooms ? { border: "1px solid red" } : {}}
                        />
                        {errors.bathrooms && <div style={{ color: "red" }}>{errors.bathrooms}</div>}
                    </div>

                    <div>
                        <label>Floor:</label>
                        <input
                            type="text"
                            name="floor"
                            value={property.floor}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Private Pool:</label>
                        <select
                            name="privatePool"
                            value={property.privatePool}
                            onChange={handleChange}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <div>
                        <label>Land Type:</label>
                        <input
                            type="text"
                            name="landType"
                            value={property.landType}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Legal Status:</label>
                        <input
                            type="text"
                            name="legalStatus"
                            value={property.legalStatus}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ marginTop: 24 }}>
                    <label>Image Gallery:</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {newImages.map((img, index) => (
                            <div key={`new-${index}`} style={{ position: "relative" }}>
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`New ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer",
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginTop: "16px" }}
                    />
                </div>

                <div style={{ marginTop: 24 }}>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        rows={4}
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 32 }}>
                    <button
                        type="button"
                        onClick={() => {
                            console.log("Cancel button clicked");
                            navigate(-1);
                        }}
                        style={{
                            padding: "12px 32px",
                            borderRadius: 12,
                            border: "1px solid #ccc",
                            background: "#fff",
                            color: "#3ca267",
                            fontWeight: 500,
                            fontSize: 18,
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: "12px 32px",
                            borderRadius: 12,
                            background: "#3ca267",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 18,
                            border: "none",
                        }}
                        disabled={saving}
                    >
                        {saving ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>

            {showMap && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}
                    onClick={() => {
                        console.log("Closing map modal");
                        setShowMap(false);
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '80%',
                            height: '80%',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '20px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                console.log("Close button clicked in modal");
                                setShowMap(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                                fontSize: '18px',
                            }}
                        >
                            X
                        </button>
                        <h2 style={{ marginBottom: '10px' }}>Location</h2>
                        <div ref={mapRef} style={{ width: '100%', height: 'calc(100% - 40px)', borderRadius: '8px' }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DBPropertyCreate;