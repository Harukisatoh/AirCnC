import React, { useState } from 'react';
import api from '../../services/api'; //Importa api do nosso backend

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    async function handleSubmit(event) { //Função para lidar com a submissão do formulário
        event.preventDefault(); //Previne o formulário de redirecionar para outra página(Comportamento padrão)

        const response = await api.post('/sessions', { email }); //Acessa a rota para armazenar usuário
        const { _id } = response.data; //Pega como retorno o id do usuário criado

        localStorage.setItem('user', _id); //Armazena o id do usuário na memória do navegador

        history.push('/dashboard'); //Redireciona para a página de Dashboard
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)} //Quando o input for alterado executa a função setEmail
                    required
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}