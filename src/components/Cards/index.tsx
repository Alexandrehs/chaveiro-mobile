import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface CardProps {
    name: string;
    brand: string;
    price: string;
    storage: string;
}

export function Cards({
    name,
    brand,
    price,
    storage
}: CardProps) {
    return (
        <RectButton style={styles.container}>
            <Text style={styles.name}>
                {name}
            </Text>
            <View>
                <View>
                    <Text >
                        Preço
                    </Text>
                    <Text style={styles.price}>
                        {price}
                    </Text>
                </View>
                <View>
                    <Text >
                        Estoque
                    </Text>
                    <Text style={styles.price}>
                        {storage}
                    </Text>
                </View>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        justifyContent: 'space-around',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.7,
        marginBottom: 10
    },
    name: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 30,
        width: '80%'
    },
    price: {
        fontSize: 14,
        fontWeight: '600'
    },
});