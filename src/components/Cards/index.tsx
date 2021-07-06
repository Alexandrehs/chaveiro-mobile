import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../../styles/colors';
import { Tag } from '../Tag';

interface CardProps extends RectButtonProps {
    id: string;
    name: string;
    brand: string;
    price: string;
    storage: string;
    warning: boolean;
}

export function Cards({
    id,
    name,
    brand,
    price,
    storage,
    warning,
    ...rest
}: CardProps) {

    return (
        <RectButton
            style={
                [
                    styles.container,
                    warning && styles.containerWarning
                ]
            }
            {...rest}
        >

            <View style={styles.titles}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Tag
                    name={brand}
                    active={false}
                />
            </View>

            <View style={styles.details}>
                <Text >
                    Preço
                </Text>
                <Text style={styles.price}>
                    {`R$ ${price},00`}
                </Text>

                <Text >
                    Estoque
                </Text>
                <Text style={styles.storage}>
                    {storage}
                </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    containerWarning: {
        width: '100%',
        height: 150,
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.warning,
        marginVertical: 5,
    },
    titles: {
        flex: 1,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 30,
        textAlign: 'left',
        paddingBottom: 10

    },
    details: {
        alignItems: 'center',
        paddingEnd: 15
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    storage: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
});