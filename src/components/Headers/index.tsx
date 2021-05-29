import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Constants from 'expo-constants';

export function Headers() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Chaveiro Mega
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff4040'
    },
});