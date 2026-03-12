import React, { useState, useEffect } from "react";
import Header from "../../../components/Navigation/Header";
import Footer from "../../../components/Footer/Footer";
import AdminSidebar from "../../../DBcomponents/Sidebar/Sidebar.jsx";
import SellerSidebar from "../../../SDBcomponents/SellerSidebar/SellerSidebar.jsx";
import {
  getUserInformation,
  updateUserInformation,
  updateAvatarProfile,
} from "../../../services/cusomerService"; // sửa lại đúng tên
import DefaultAvatar from "../../../Assets/img/DefaultAvatar.jpg"; // Import ảnh mặc định
import "./profile.css";


const BASE_URL = "http://localhost:8082";


const ProfileView = () => {
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
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setUserRole(storedRole);
    }
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const idNum = Number(parsedUser.id);
        if (Number.isInteger(idNum) && idNum > 0) {
          setUserID(idNum);
        } else {
          console.error(
              "ID người dùng không hợp lệ trong localStorage:",
              parsedUser.id
          );
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
      <div className="pv-content-wrapper">
        <div className="pv-profile-page">
          <div className="pv-profile-container">
            <div className="pv-profile-header">
              {/* Nút Save Changes đã được di chuyển xuống dưới */}
            </div>


            <div className="pv-edit-wrapper">
              {/* Avatar */}
              <div className="pv-details-section">
                <div className="pv-image-wrapper pv-image-upload">
                  {formData.imgPath ? (
                      <img
                          src={formData.imgPath}
                          alt="Profile"
                          className="pv-image-preview"
                          style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                  ) : (
                      <img
                          src={DefaultAvatar}
                          alt="Default avatar"
                          className="pv-image-preview"
                          style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                  )}
                  <label className="edit-overlay">
                    <i className="icon-pencil" /> Edit
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                  </label>
                </div>


                {/* Basic Info */}
                <div className="pv-info-section">
                  <div className="pv-field-row">
                    <label className="pv-label">First Name:</label>
                    <input
                        className="pv-input"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="pv-field-row">
                    <label className="pv-label">Last Name:</label>
                    <input
                        className="pv-input"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="pv-field-row">
                    <label className="pv-label">Birthday:</label>
                    <input
                        className="pv-input"
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="pv-field-row">
                    <label className="pv-label">Email:</label>
                    <input
                        className="pv-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="pv-field-row">
                    <label className="pv-label">Phone:</label>
                    <input
                        className="pv-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                  </div>
                </div>
              </div>


              <div className="pv-save-section">
                <button className="pv-save-btn-main" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>


              {message && <p className="pv-message">{message}</p>}
            </div>
          </div>
        </div>
      </div>
  ) : (
      <div className="pv-loading">{message || "Đang tải thông tin người dùng..."}</div>
  );


  if (!profile) {
    return profileContent;
  }


  if (userRole === "admin") {
    return (
        <div className="profile-layout">
          <AdminSidebar />
          <main className="profile-main-content">{profileContent}</main>
        </div>
    );
  }


  if (userRole === "seller") {
    return (
        <div className="profile-layout">
          <SellerSidebar />
          <main className="profile-main-content">{profileContent}</main>
        </div>
    );
  }


  return (
      <>
        <Header />
        {profileContent}
        <Footer />
      </>
  );
};


export default ProfileView;



