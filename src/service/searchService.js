import axios from "axios";

export const searchService = async (query) => {
  try {
    const response = await axios.get("https://tiktok.fullstack.edu.vn/api/users/search", {
      params: {
        q: query,
        type: "less",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};