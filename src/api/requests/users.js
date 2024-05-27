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
    }
}

export default users;