import { defineStore } from "pinia";
import { fetchIsparkData } from "@/services/isparkApi";

export const useIsparkStore = defineStore("ispark", {
  state: () => ({
    isparkData: [],
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
  },
  getters: {
    getIsparkData: (state) => state.isparkData,
    isLoadingState: (state) => state.isLoading,
    getError: (state) => state.error,
  },
});
