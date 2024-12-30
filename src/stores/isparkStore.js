import { defineStore } from "pinia";
import {
  fetchIsparkData,
  fetchNearbyParking,
  fetchDrivingInfo,
} from "@/services/isparkApi";

export const useIsparkStore = defineStore("ispark", {
  state: () => ({
    isparkData: [],
    nearbyParkingLots: [],
    drivingInfo: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchIsparkData() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await fetchIsparkData();
        this.isparkData = data;
      } catch (error) {
        this.error = "Failed to fetch ispark data";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchNearbyParking(lat, lng, radius = 5, limit = 30) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await fetchNearbyParking(lat, lng, radius, limit);
        this.nearbyParkingLots = data.data;
        await this.fetchDrivingInfo(lat, lng, data.data);
      } catch (error) {
        this.error = "Failed to fetch nearby parking lots";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchDrivingInfo(lat, lng, parkingLots) {
      this.isLoading = true;
      this.error = null;
      try {
        const enrichedLots = await fetchDrivingInfo(lat, lng, parkingLots);
        this.drivingInfo = enrichedLots;
        this.isparkData = enrichedLots;
      } catch (error) {
        this.error = "Failed to fetch driving info";
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getIsparkData: (state) => state.isparkData,
    getNearbyParkingLots: (state) => state.nearbyParkingLots,
    getDrivingInfo: (state) => state.drivingInfo,
    isLoadingState: (state) => state.isLoading,
    getError: (state) => state.error,
  },
});
