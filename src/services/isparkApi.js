import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchIsparkData = async () => {
  try {
    const response = await apiClient.get("/ispark-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching ispark data:", error);
    throw error;
  }
};
