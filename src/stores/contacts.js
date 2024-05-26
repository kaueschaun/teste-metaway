import { defineStore } from 'pinia';
import favoriteApi from '../api/requests/favorite';
import contactsApi from '../api/requests/contacts';
import { useToast } from 'vue-toast-notification';

const toast = useToast()

export const useContactStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    contactsFavorite: [],
    searchResults: [],
    initialContacts: []
  }),
  getters: {
    contactsCombined(state) {
      if (state.searchResults.length > 0) {
        return state.searchResults.map(contact => ({
          ...contact,
          favorito: state.contactsFavorite.some(fav => fav.id === contact.id)
        }));
      }
      const contatosFavoritos = state.contactsFavorite.map(favorito => ({
        ...favorito,
        favorito: true
      }));

      const contatosNormais = state.contacts.map(contato => ({
        ...contato,
        favorito: false
      }));

      const contatosMap = new Map();
      contatosNormais.forEach(contato => {
        contatosMap.set(contato.id, contato);
      });
      contatosFavoritos.forEach(favorito => {
        if (!contatosMap.has(favorito.id)) {
          contatosMap.set(favorito.id, favorito);
        } else {
          contatosMap.set(favorito.id, { ...contatosMap.get(favorito.id), favorito: true });
        }
      });

      return Array.from(contatosMap.values());
    }
  },
  actions: {
    async fetchContacts() {
      const id = localStorage.getItem('userId');
      try {
        const { data } = await contactsApi.get(id);
        this.setContacts(data);
        this.initialContacts = this.contactsCombined; // Set initial contacts
      } catch (error) {
        toast.error('Ocorreu um erro inesperado!', {
          position: 'top'
        });
      }
    },
    async fetchFavorites() {
      try {
        const { data } = await favoriteApi.get();
        this.setContactsFavorite(data);
        this.initialContacts = this.contactsCombined; // Set initial contacts
      } catch (error) {
        toast.error('Ocorreu um erro inesperado!', {
          position: 'top'
        });
      }
    },
    setContacts(contacts) {
      this.contacts = contacts;
    },
    setContactsFavorite(contactsFavorite) {
      this.contactsFavorite = contactsFavorite;
    },
    addContact(contact) {
      this.contacts.push(contact);
    },
    addFavorite(contact) {
      this.contactsFavorite.push(contact);
    },
    removeFavorite(id) {
      this.contactsFavorite = this.contactsFavorite.filter(fav => fav.id !== id);
    },
    removeContact(id) {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
    },
    setSearchResults(results) {
      this.searchResults = results;
    },
    clearSearchResults() {
      this.searchResults = [];
    }
  }
});

