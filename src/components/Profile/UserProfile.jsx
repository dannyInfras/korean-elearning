import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Import file CSS

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUser(response.data);
        setUpdatedUser(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    if (updatedUser) {
      setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    }
  };

  const handleConfirmUpdate = async () => {
    if (!updatedUser) return;

    const confirm = window.confirm("Bạn có chắc chắn muốn cập nhật thông tin không?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:3000/users/${user?._id}`, updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <label>
        Name:
        <input type="text" name="name" value={updatedUser?.name || ""} onChange={handleChange} disabled={!isEditing} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={updatedUser?.email || ""} onChange={handleChange} disabled={!isEditing} />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" value={updatedUser?.phone || ""} onChange={handleChange} disabled={!isEditing} />
      </label>
      {isEditing ? (
        <>
          <button className="confirm-btn" onClick={handleConfirmUpdate}>Xác nhận</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Hủy</button>
        </>
      ) : (
        <button className="update-btn" onClick={handleUpdateClick}>Cập nhật</button>
      )}
    </div>
  );
};

export default UserProfile;
