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

  addRating: (articleId, rating) => {
    return axios
      .post(`${API_BASE_URL}/articles/${articleId}/add_rating/`, { rating })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error("Error adding rating:", error.response.data);
          throw error.response.data;
        } else {
          console.error("Error adding rating:", error);
          throw error;
        }
      });
  },

  getAverageRating: (articleId) => {
    return axios
      .get(`${API_BASE_URL}/articles/${articleId}/get_average_rating/`)
      .then((response) => {
        console.log(response.data);
        return response.data; // You can handle the response accordingly
      })
      .catch((error) => {
        console.error("Error getting average rating:", error);
        throw error;
      });
  },
};

export default ArticleService;
