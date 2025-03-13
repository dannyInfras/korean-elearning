import React, { useState, useEffect } from "react";
import "./UserProfile.css";

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
        body: JSON.stringify({
          email: "john@example.com",
          password: "yourpassword",
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        alert("Không nhận được token!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
      alert("Lỗi khi lấy token!");
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy thông tin user!");
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
    if (!confirm) return;

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
      console.error("Lỗi khi cập nhật user:", error);
      alert("Không thể cập nhật thông tin user!");
    }
  };

  React.useEffect(() => {
    if (!token) {
      fetchToken();
    } else {
      fetchUser();
    }
  }, [token]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <label>
        Name:
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
          <button className="confirm-btn" onClick={handleConfirmUpdate}>
            Xác nhận
          </button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>
            Hủy
          </button>
        </>
      ) : (
        <button className="update-btn" onClick={handleEdit}>
          Cập nhật
        </button>
      )}
    </div>
  );
};

export default UserProfile;
