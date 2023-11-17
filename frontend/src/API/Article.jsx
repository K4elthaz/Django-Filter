import axios from "axios";

const ArticleService = {
  getArticles: () => {
    return axios
      .get("http://localhost:8000/api/articles/")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        throw error;
      });
  },
};

export default ArticleService;
