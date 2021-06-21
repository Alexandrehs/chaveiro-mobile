import React from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';


import Constants from 'expo-constants';

export function Headers() {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff4040',
        fontFamily: 'Pacifico_400Regular',
    },
    logo: {
        height: 100,
        width: '100%'
    }
});