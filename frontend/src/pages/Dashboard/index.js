import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import socketio from 'socket.io-client';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user'); //Busca o id do usuário que foi armazenado no navegador
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);
    
    useEffect(() => { //Faz uma busca inicial na api, executa apenas uma vez(aqui é utilizado para buscar os spots já cadastrados do usuário)
        async function loadSpots() {
            const user_id = localStorage.getItem('user'); //Busca o id do usuário que foi armazenado no navegador
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            
            setSpots(response.data);
        }

        loadSpots();
    }, [])

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                { requests.map(request => (
                    <li key={requests._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>

            { spots[0] ? <></> : <p id="emptySpots">Você não têm nenhum spot cadastrado!</p> }
            <ul className="spot-list">
                { spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    </li>
                )) }
            </ul>

            <Link to='/new'>
                <button className='btn'>Cadastrar novo spot</button>
            </Link>
        </>
    )
}