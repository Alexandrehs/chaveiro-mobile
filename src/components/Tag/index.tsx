import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface TagProps {
    title: string;
}

export function Tag({ title }: TagProps) {
    return (
        <RectButton style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        borderRadius: 15,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginLeft: 6
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#5f5f5f',
    },
});