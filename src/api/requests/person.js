import api from "../index.js"

const person = {
    get: (id) => {
        return api().get(`pessoa/buscar/${id}`)
    }
}

export default person;