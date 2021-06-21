import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Alert
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Feather from '@expo/vector-icons/Feather';

import colors from '../../styles/colors';
import { Tag } from '../Tag';
import api from '../../services/api';

interface CardProps {
    id: string;
    name: string;
    brand: string;
    price: string;
    storage: string;
}

export function Cards({
    id,
    name,
    brand,
    price,
    storage,
    ...rest
}: CardProps) {

    const [storageReal, setStorageReal] = useState<string>(storage);
    const swipeRef = useRef<Swipeable | null>(null);

    function handleAlert() {
        Alert.alert(
            "Baixa,",
            "sera removido 1 do estoque deste item.",
            [
                {
                    text: "Confirmar",
                    onPress: () => handleExit()
                },
                {
                    text: "Cancelar",
                    onPress: () => { swipeRef.current?.close() }
                }
            ],
            {
                cancelable: true
            }
        );
    }

    async function handleExit() {
        try {
            const storageNumber = Number(storageReal);
            let newStorage = storageNumber - 1;

            if (newStorage < 0) {
                newStorage = 0;
                swipeRef.current?.close();
                return Alert.alert("Desculpe o item ja está sem estoque.");
            }

            await api.put(`items/${id}`, {
                storage: String(newStorage)
            });

            setStorageReal(String(newStorage));

            swipeRef.current?.close();

        } catch (error) {
            throw Error(error)
        }
    }


    return (
        <Swipeable
            ref={swipeRef}
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <RectButton
                        style={styles.buttomExit}
                        onPress={handleAlert}
                    >
                        <Feather name="edit" size={50} color={colors.red} />
                    </RectButton>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                {...rest}
            >

                <View style={styles.titles}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Tag
                        name={brand}
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
                        {storageReal}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
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
    titles: {
        flex: 1
    },
    name: {
        fontSize: 17,
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
    }
});