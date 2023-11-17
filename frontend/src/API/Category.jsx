import axios from "axios";

const CategoryService = {
  getCategory: () => {
    return axios
      .get("http://localhost:8000/api/categories/")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching Category:", error);
        throw error;
      });
  },
};

export default CategoryService;
