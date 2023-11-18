// ArticleService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const ArticleService = {
  getArticles: () => {
    return axios
      .get(`${API_BASE_URL}/articles/`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        throw error;
      });
  },

  incrementViews: (articleId) => {
    return axios
      .put(`${API_BASE_URL}/articles/${articleId}/increment_views/`)
      .then((response) => {
        console.log(response.data);
        return response.data; // You can handle the response accordingly
      })
      .catch((error) => {
        console.error("Error incrementing views:", error);
        throw error;
      });
  },
};

export default ArticleService;
