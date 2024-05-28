import api from "../index.js"

const users = {
    get: (id) => {
        return api().get(`usuario/buscar/${id}`)
    },
    update: (payload) => {
        return api().put(`usuario/atualizar`, payload)
    },
    updatePassword: (payload) => {
        return api().post('usuario/alterarSenha', payload)
    },
    search: (term) => {
        return api().post('usuario/pesquisar', term)
    },
    create: (payload) => {
        return api().post('usuario/salvar', payload)
    }
}

export default users;