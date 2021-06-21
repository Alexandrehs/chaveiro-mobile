import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Alert,
    Modal,
    TextInput
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
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [inputEntrance, setInputEntrance] = useState<string>('');

    function handleAlertExit() {
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

    async function handleEntrance() {
        if (inputEntrance !== '') {
            const entrance = Number(inputEntrance) + Number(storageReal);
            await api.put(`items/${id}`, {
                storage: String(entrance)
            });

            setStorageReal(String(entrance));
            setModalVisible(!modalVisible);
            swipeRef.current?.close();
        }
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
                        onPress={handleAlertExit}
                    >
                        <Feather name="edit" size={50} color={colors.red} />
                    </RectButton>
                </Animated.View>
            )}
            renderLeftActions={() => (
                <Animated.View>
                    <RectButton
                        style={styles.buttomEntrance}
                        onPress={() => { setModalVisible(true) }}
                    >
                        <Feather name="edit" size={50} color={colors.green_dark} />
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View>
                                <Text
                                    style={{ fontSize: 16 }}
                                >
                                    Quantos produtos entraram?
                                </Text>
                            </View>
                        </View>
                        <View style={styles.modalContent}>
                            <TextInput
                                keyboardType="number-pad"
                                style={
                                    {
                                        backgroundColor: colors.shape,
                                        height: 25,
                                        width: 40,
                                        textAlign: 'center'
                                    }
                                }
                                value={inputEntrance}
                                onChangeText={text => setInputEntrance(text)}
                            />
                        </View>
                        <View style={styles.modalFooter}>
                            <View>
                                <RectButton
                                    style={
                                        {
                                            height: 50,
                                            width: 120,
                                            backgroundColor: colors.green_light,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10,
                                            marginRight: 20,
                                            borderRadius: 10
                                        }
                                    }
                                    onPress={handleEntrance}
                                >
                                    <Text>
                                        Confirmar
                                    </Text>
                                </RectButton>
                            </View>

                            <View>
                                <RectButton
                                    style={
                                        {
                                            height: 50,
                                            width: 120,
                                            backgroundColor: colors.red,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10,
                                            borderRadius: 10
                                        }
                                    }
                                    onPress={() => { setModalVisible(!modalVisible) }}
                                >
                                    <Text>
                                        Cancelar
                                    </Text>
                                </RectButton>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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