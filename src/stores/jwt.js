import { defineStore } from "pinia";

export const useJwtStore = defineStore("jwt", {
  state: () => ({
    token: null,
  }),
  getters: {
    getToken() {
      return this.token;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    clearToken() {
      this.token = null;
    },
  },
});
