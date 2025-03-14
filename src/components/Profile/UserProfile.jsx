import React, { useState, useEffect } from "react";
import "./UserProfile.css"; // Import file CSS

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lấy token!");
      }

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
      }
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
      alert("Không thể lấy token!");
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lấy thông tin user!");
      }

      const data = await response.json();
      setUser(data);
      setUpdatedUser(data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      alert("Không thể lấy thông tin user!");
    }
  };

  const updateUser = async () => {
    if (!updatedUser || !token) return;

    const confirmUpdate = window.confirm("Bạn có chắc chắn muốn cập nhật thông tin không?");
    if (!confirmUpdate) return;

    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật!");
      }

      const data = await response.json();
      setUser(data);
      setUpdatedUser(data);
      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin user:", error);
      alert("Không thể cập nhật thông tin user!");
    }
  };

  useEffect(() => {
    if (!token) {
      fetchToken();
    } else {
      fetchUserProfile(token);
    }
  }, [token]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <label>
        Tên:
        <input
          type="text"
          name="name"
          value={updatedUser?.name || ""}
          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          disabled={!isEditing}
        />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={updatedUser?.email || ""} disabled />
      </label>
      <br />
      {isEditing ? (
        <>
          <button className="confirm-btn" onClick={updateUser}>Xác nhận</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Hủy</button>
        </>
      ) : (
        <button className="update-btn" onClick={() => setIsEditing(true)}>Cập nhật</button>
      )}
    </div>
  );
};

export default UserProfile;
