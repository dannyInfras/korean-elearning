import axios from "axios";

const prefix = "/blogs";

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${prefix}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cinemas: " + error.message);
  }
};

export const fetchBlogById = async (blogId) => {
  try {
    const response = await axios.get(`${prefix}/${blogId}`, {
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room details: " + error.message);
  }
};
