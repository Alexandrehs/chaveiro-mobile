import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import aviao from '../../assets/paperplaneRed.json';

import LottieView from 'lottie-react-native';

export function Loading() {
    return (
        <View style={styles.container}>
            <LottieView
                source={aviao}
                autoPlay
                loop
                style={styles.animation}
            />
            <Text>Carregando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    animation: {
        width: 200,
        height: 200,
        backgroundColor: 'transparent'
    }
});