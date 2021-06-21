import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface TagProps extends RectButtonProps {
    name: string;
}

export function Tag({ name, ...rest }: TagProps) {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <Text style={styles.title}>
                {name}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d3d3d3',
        borderRadius: 15,
        width: 110,
        height: 40,
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