import api from "../index.js"

const users = {
    get: (id) => {
        return api().get(`usuario/buscar/${id}`)
    }
}

export default users;