import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    role: '',
    name: '',
    email: '',
    birthDate: '',
    cpf: '',
    username: '',
    telefone: '',
    // Adicione outras propriedades conforme necessário
  }),
  actions: {
    setUser(user) {
      this.id = user.id ?? localStorage.getItem('userId');
      this.role = user.role;
      this.name = user.name;
      this.email = user.email;
      this.birthDate = user.birthDate;
      this.cpf = user.cpf;
      this.username = user.username;
      this.telefone = user.telefone;

      localStorage.setItem('userId', this.id);
      // localStorage.setItem('userRole', this.role); // Removido, pois não queremos salvar a role no localStorage
    },
    loadUser() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.id = userId;
      }
      // A role não será carregada do localStorage, apenas do servidor
    },
    clearUser() {
      this.id = null;
      this.role = '';
      this.nome = '';
      this.email = '';
      this.birthDate = '';
      this.telefone = '';
      // Limpe outras propriedades do usuário conforme necessário

      localStorage.removeItem('userId');
      // localStorage.removeItem('userRole'); // Removido, pois não estamos salvando a role no localStorage
    }
  }
});
