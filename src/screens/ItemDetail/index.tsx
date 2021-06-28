import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import api from '../../services/api';
import colors from '../../styles/colors';

interface ItemProps {
    id: string;
    name: string;
    price: string;
    storage: string;
}

export function ItemDetail() {
    const routes = useRoute();
    const {
        id,
        name,
        price,
        storage
    } = routes.params as ItemProps;

    const [theAmount, setTheAmout] = useState('');
    const navigation = useNavigation();

    function handleAction(action: string) {
        if (action === 'entrance') {
            Alert.alert(
                "Entrada",
                `Você esta adicionando ${theAmount} no estoque.`,
                [
                    {
                        text: "Confirmar",
                        onPress: () => handleEntrance()
                    },
                    {
                        text: "Cancelar"
                    }
                ],
                {
                    cancelable: true
                }
            );
        }

        if (action === 'exit') {
            Alert.alert(
                "Saida",
                `Você esta removendo ${theAmount} no estoque.`,
                [
                    {
                        text: "Confirmar",
                        onPress: () => handleExit()
                    },
                    {
                        text: "Cancelar"
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    async function handleEntrance() {
        let newStorage = 0;
        if (Number(theAmount) > 0 && theAmount !== '') {
            newStorage = Number(storage) + Number(theAmount);
            await updateItem(id, String(newStorage));
        } else {
            Alert.alert(
                "Desculpe",
                "O valor tem que ser positivo",
                [
                    {
                        text: "OK"
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    function handleExit() {
        let newStorage = 0;
        if (Number(theAmount) > 0 && theAmount !== '') {
            newStorage = Number(storage) - Number(theAmount);
            updateItem(id, String(newStorage));
        } else {
            Alert.alert(
                "Desculpe",
                "O valor tem que ser positivo",
                [
                    {
                        text: "OK"
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    async function updateItem(id: string, newStorage: string) {
        await api.put(`items/${id}`, {
            storage: String(newStorage)
        });

        Alert.alert(
            "OK",
            "Alterações salvas.",
            [
                {
                    text: "OK",
                    onPress: () => navigation.goBack()
                }
            ],
            {
                cancelable: true
            }
        );
    }

    return (
        <View style={styles.constainer}>
            <View>
                <Text style={styles.title}>
                    {name}
                </Text>
            </View>
            <View style={styles.content}>
                <View style={{
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Text>
                        Preço
                    </Text>
                    <Text style={styles.contentText}>
                        {`R$ ${price},00`}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Text>
                        Estoque
                    </Text>
                    <Text style={styles.contentText}>
                        {storage}
                    </Text>
                </View>
            </View>
            <View>
                <TextInput
                    style={{
                        backgroundColor: '#E8E8E8',
                        height: 40,
                        width: 150,
                        borderRadius: 20,
                        paddingHorizontal: 15
                    }}
                    autoCorrect={false}
                    value={theAmount}
                    onChangeText={text => setTheAmout(text)}
                    placeholder="quantidade..."
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.actions}>
                <View style={styles.buttons}>
                    <View>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.green_light,
                                height: 50,
                                width: 110,
                                borderRadius: 30,
                                marginRight: 100
                            }}
                            onPress={() => handleAction('entrance')}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}
                            >
                                Entrada
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.red,
                                height: 50,
                                width: 110,
                                borderRadius: 30,
                            }}
                            onPress={() => handleAction('exit')}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}
                            >
                                Saida
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
        alignItems: 'center',
        alignContent: 'center'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
    },
    contentText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    actions: {
        padding: 10
    },
    buttons: {
        flexDirection: 'row',
        alignContent: 'space-between',
    },
});