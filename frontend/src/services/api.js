import axios from 'axios'; //Importa o axios para redirecionar o frontend para as rotas do backend

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;