import api from "../index.js"

const contacts = {
    get: (id) => {
        return  api().get(`contato/listar/${id}`, )
    },
    create: (payload) => {
        return  api().post('contato/salvar', payload )
    },
    delete: (id) => {
        return  api().delete(`contato/remover/${id}`, )
    },
    search: (payload) => {
        return  api().post(`contato/pesquisar`, payload )
    }
}
export default contacts;