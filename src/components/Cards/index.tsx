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
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 30,
        paddingRight: 10,

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
    buttomExit: {
        flex: 1,
        width: 150,
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        paddingLeft: 15
    },
    buttomEntrance: {
        flex: 1,
        width: 150,
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        paddingLeft: 15
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22
    },
    modalContainer: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 150,
        width: 300
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalContent: {
        alignItems: 'center'
    },
    modalFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around'
    },
});