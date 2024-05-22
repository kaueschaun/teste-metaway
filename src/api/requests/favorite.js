import api from "../index.js"

const favorite = {
    get: () => {
        return  api().get(`favorito/pesquisar` )
    },
    create: (payload) => {
        return  api().post(`favorito/salvar`, payload )
    },
    remove: (id) => {
        return  api().delete(`favorito/remover/${id}`,  )
    },
}
export default favorite;