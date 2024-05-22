import api from "../index.js"

const contacts = {
    get: (id) => {
        return  api().get(`contato/listar/${id}`, )
    },
    delete: (id) => {
        return  api().delete(`contato/remover/${id}`, )
    },
}
export default contacts;