import React, { useState, useEffect } from "react";
import AdminSidebar from "../../DBcomponents/Sidebar/Sidebar.jsx";
import {
    getUserInformation,
    updateUserInformation,
    updateAvatarProfile,
} from "../../services/cusomerService";
import DefaultAvatar from "../../Assets/img/DefaultAvatar.jpg";
import "./AdminProfile.css";


const BASE_URL = "http://localhost:8082";


const AdminProfile = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        imgPath: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [message, setMessage] = useState("");
    const [userID, setUserID] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");
        if (storedRole !== "admin") {
            setMessage("Bạn không có quyền truy cập trang này.");
            return;
        }
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const idNum = Number(parsedUser.id);
                if (Number.isInteger(idNum) && idNum > 0) {
                    setUserID(idNum);
                } else {
                    console.error("ID người dùng không hợp lệ trong localStorage:", parsedUser.id);
                    setMessage("ID người dùng không hợp lệ.");
                }
            } catch (err) {
                console.error("Dữ liệu user trong localStorage không hợp lệ:", err);
                setMessage("Dữ liệu người dùng không hợp lệ.");
            }
        } else {
            console.warn("Không tìm thấy key 'user' trong localStorage");
            setMessage("Vui lòng đăng nhập để xem trang này.");
        }
    }, []);


    const fetchProfile = async (id) => {
        setMessage("");
        try {
            const data = await getUserInformation(id);
            console.log("Server trả về:", data);
            setProfile(data);
            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phone: data.phone || "",
                birthday: data.birthday || "",
                imgPath: data.imgPath || data.ImgPath || "",
            });


            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    birthday: data.birthday,
                    picture: data.imgPath || data.ImgPath || "",
                })
            );
            window.dispatchEvent(new Event("userInfoChanged"));
        } catch (err) {
            console.error("Lỗi khi tải thông tin:", err);
            setMessage("Lỗi khi tải thông tin người dùng: " + err.message);
        }
    };


    useEffect(() => {
        if (!userID) return;
        fetchProfile(userID);
    }, [userID]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            setImageFile(file);
            setFormData((prev) => ({
                ...prev,
                imgPath: URL.createObjectURL(file),
            }));
        }
    };


    const updateProfileInfo = async () => {
        if (!profile) {
            setMessage("Không tìm thấy thông tin profile.");
            return false;
        }
        setMessage("");


        const userDTO = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthday: formData.birthday,
            email: formData.email,
            phone: formData.phone,
            imgPath: formData.imgPath,
        };


        const res = await updateUserInformation(userID, userDTO);
        if (!res.success) {
            setMessage(res.message);
            return false;
        }


        setProfile((prev) => ({ ...prev, ...userDTO }));
        setMessage("Cập nhật thông tin thành công 🎉");


        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                const usr = JSON.parse(stored);
                usr.firstName = userDTO.firstName;
                usr.lastName = userDTO.lastName;
                usr.email = userDTO.email;
                usr.phone = userDTO.phone;
                usr.birthday = userDTO.birthday;
                usr.picture = userDTO.imgPath;
                localStorage.setItem("user", JSON.stringify(usr));
                window.dispatchEvent(new Event("userInfoChanged"));
            } catch (e) {
                console.error("Không thể cập nhật localStorage:", e);
            }
        }


        return true;
    };


    const updateAvatar = async () => {
        if (!profile) {
            setMessage("Không tìm thấy thông tin profile.");
            return false;
        }
        if (!imageFile) {
            setMessage("Vui lòng chọn file avatar.");
            return false;
        }


        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(imageFile.type)) {
            setMessage("Chỉ cho phép JPEG, PNG, GIF.");
            return false;
        }
        if (imageFile.size > 5 * 1024 * 1024) {
            setMessage("File quá lớn (>5MB).");
            return false;
        }


        setMessage("");
        const fd = new FormData();
        fd.append("avatar", imageFile);


        try {
            const res = await updateAvatarProfile(userID, fd);
            if (!res.success) {
                setMessage(res.message);
                return false;
            }


            const url = res.avatarUrl?.startsWith("http")
                ? res.avatarUrl
                : BASE_URL + res.avatarUrl;


            setFormData((prev) => ({ ...prev, imgPath: url }));
            setProfile((prev) => ({ ...prev, imgPath: url }));
            setMessage("Cập nhật avatar thành công 🎉");


            const stored = localStorage.getItem("user");
            if (stored) {
                try {
                    const usr = JSON.parse(stored);
                    usr.picture = url;
                    localStorage.setItem("user", JSON.stringify(usr));
                } catch (e) {
                    console.error("Không thể cập nhật localStorage:", e);
                }
            }


            window.dispatchEvent(new Event("avatarChanged"));
            window.dispatchEvent(new Event("userInfoChanged"));
            return true;
        } catch (err) {
            console.error("Lỗi khi cập nhật avatar:", err);
            setMessage(err.message || "Lỗi khi cập nhật avatar.");
            return false;
        }
    };


    const handleSaveChanges = async () => {
        let ok = false;
        if (isEditingBasicInfo || isEditingEmail || isEditingPhone) {
            ok = await updateProfileInfo();
            if (!ok) return;
        }
        if (imageFile) {
            ok = await updateAvatar();
            if (!ok) return;
        }
        if (ok) {
            setIsEditingBasicInfo(false);
            setIsEditingEmail(false);
            setIsEditingPhone(false);
            setImageFile(null);
        }
    };


    const profileContent = profile ? (
        <div className="admin-content-wrapper">
            <div className="admin-profile-page">
                <div className="admin-profile-container">
                    <div className="admin-profile-header"></div>


                    <div className="admin-edit-wrapper">
                        <div className="admin-details-section">
                            <div className="admin-image-wrapper">
                                {formData.imgPath ? (
                                    <img
                                        src={formData.imgPath}
                                        alt="Profile"
                                        className="admin-image-preview"
                                        style={{ width: 100, height: 100, objectFit: "cover" }}
                                    />
                                ) : (
                                    <img
                                        src={DefaultAvatar}
                                        alt="Default avatar"
                                        className="admin-image-preview"
                                        style={{ width: 100, height: 100, objectFit: "cover" }}
                                    />
                                )}
                                <label className="admin-edit-overlay">
                                    <i className="icon-pencil" /> Edit
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>


                            <div className="admin-info-section">
                                <div className="admin-field-row">
                                    <label className="admin-label">First Name:</label>
                                    <input
                                        className="admin-input"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="admin-field-row">
                                    <label className="admin-label">Last Name:</label>
                                    <input
                                        className="admin-input"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="admin-field-row">
                                    <label className="admin-label">Birthday:</label>
                                    <input
                                        className="admin-input"
                                        type="date"
                                        name="birthday"
                                        value={formData.birthday}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="admin-field-row">
                                    <label className="admin-label">Email:</label>
                                    <input
                                        className="admin-input"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="admin-field-row">
                                    <label className="admin-label">Phone:</label>
                                    <input
                                        className="admin-input"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="admin-save-section">
                            <button className="admin-save-btn" onClick={handleSaveChanges}>
                                Save Changes
                            </button>
                        </div>


                        {message && <p className="admin-message">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="admin-loading">{message || "Đang tải thông tin người dùng..."}</div>
    );


    return (
        <div className="admin-profile-layout">
            <AdminSidebar />
            <main className="admin-main-content">{profileContent}</main>
        </div>
    );
};


export default AdminProfile;

