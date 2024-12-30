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

export const fetchNearbyParking = async (lat, lng, radius = 5, limit = 30) => {
  try {
    const response = await apiClient.post("/nearest-parking", {
      lat,
      lng,
      radius,
      limit,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby parking:", error);
    throw error;
  }
};

export const fetchDrivingInfo = async (lat, lng, parkingLots) => {
  try {
    const response = await apiClient.post("/drive-info", {
      lat,
      lng,
      parkingLots,
    });
    return response.data.enriched_parking_lots;
  } catch (error) {
    console.error("Error fetching driving info:", error);
    throw error;
  }
};
