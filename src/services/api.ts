import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',          //informa o endereço que vai ser repetido
});

export default api