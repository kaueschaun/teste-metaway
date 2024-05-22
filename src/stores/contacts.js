import { defineStore } from 'pinia';
import favoriteApi from '../api/requests/favorite'; 
import contactsApi from '../api/requests/contacts'; 

export const useContactStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    contactsFavorite: []
  }),
  getters: {
    contactsCombined(state) {
      const contatosFavoritos = state.contactsFavorite.map(favorito => ({
        ...favorito,
        favorito: true
      }));

      const contatosNormais = state.contacts.map(contato => ({
        ...contato,
        favorito: false
      }));

      // Cria um mapa para verificar duplicações pelo ID
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
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    },
    async fetchFavorites() {
      try {
        const { data } = await favoriteApi.get();
        this.setContactsFavorite(data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    },
    setContacts(contacts) {
      this.contacts = contacts;
    },
    setContactsFavorite(contactsFavorite) {
      this.contactsFavorite = contactsFavorite;
    },
    addFavorite(contact) {
      this.contactsFavorite.push(contact);
    },
    removeFavorite(id) {
      this.contactsFavorite = this.contactsFavorite.filter(fav => fav.id !== id);
    },
    removeContact(id) {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
    }
  }
});
