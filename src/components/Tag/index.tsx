import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface TagProps extends RectButtonProps {
    name: string;
    active?: boolean;
}

export function Tag(
    {
        name, active, ...rest
    }: TagProps
) {
    return (
        <RectButton
            style={
                [
                    styles.container,
                    active && styles.containerActive
                ]
            }
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
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginLeft: 6
    },
    containerActive: {
        backgroundColor: '#adadad',
        borderRadius: 15,
        width: 110,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginLeft: 6
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        color: '#5f5f5f',
    },
});