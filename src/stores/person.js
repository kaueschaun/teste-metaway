import { defineStore } from 'pinia';

export const usePersonStore = defineStore('person', {
  state: () => ({
    person: null 
  }),
  actions: {
    setPerson(person) {
      this.person = person; 
    }
  }
});