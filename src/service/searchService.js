import axios from "axios";

export const searchService = async (query, less = 5) => {
  try {
    const response = await axios.get(`http://localhost:8086/api/v1/films/search?keyword=${query}&less=${less}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
