import axios from "axios";

const BlogService = {
  getBlogs: () => {
    return axios
      .get("http://localhost:8000/api/blogs/") // Use the correct URL for your Django server
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching Blogs:", error);
        throw error;
      });
  },

  createBlog: (blogData) => {
    const token = localStorage.getItem("access_token");

    // Set the Authorization header with the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .post("http://localhost:8000/api/blogs/", blogData,{headers}) // Use the correct URL for your Django server
      .then((response) => {
        console.log("Blog created:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating Blog:", error);
        throw error;
      });
  },
};

export default BlogService;
