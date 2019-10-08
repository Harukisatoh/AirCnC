import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, View, ScrollView, Image, StyleSheet, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
import logoutIcon from '../assets/logout.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://{your_ip}:3333', {
                query: { user_id },
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            });
        });
    }, []);
    
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        });
    }, []);

    async function handleLogout() {
        AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Image style={styles.logoutIcon} source={logoutIcon} />
                </TouchableOpacity>
                <Image style={styles.logo} source={logo} />
                <View style={styles.rightSpace} />
            </View>
            

            <ScrollView>
                { techs.map(tech => <SpotList key={tech} tech={tech} />) }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 15,
    },

    logoutButton: {
        flex: 1,
        justifyContent: 'center',
    },

    logoutIcon: {
        height: 25,
        width: 40,
        resizeMode: 'contain',
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex: 1,
    },

    rightSpace: {
        height: 25,
        width: 40,
        alignSelf: 'center',
    }
});