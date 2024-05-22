// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    role: '',
  }),
  actions: {
    setUser(user) {
      this.id = user.id;
      this.role = user.role;
      localStorage.setItem('userId', user.id);
      // localStorage.setItem('userRole', user.role);
    },
    loadUser() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.id = userId;
      }
      const userRole = localStorage.getItem('userRole');
      // if (userRole) {
      //   this.role = userRole;
      // }
    },
    clearUser() {
      this.id = null;
      this.role = '';
      localStorage.removeItem('userId');
      // localStorage.removeItem('userRole');
    }
  }
});
