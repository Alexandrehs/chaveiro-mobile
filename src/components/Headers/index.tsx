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
        flexDirection: 'row',
        height: 40,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    logo: {
        height: 190,
        resizeMode: 'center'
    }
});