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
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import { Tag } from '../../components/Tag';
import api from '../../services/api';
import colors from '../../styles/colors';

interface ItemProps {
    id: string;
    name: string;
    price: string;
    storage: string;
    brand: string;
    category: string;
}

export function ItemDetail() {
    const routes = useRoute();
    const {
        id,
        name,
        price,
        storage,
        brand,
        category
    } = routes.params as ItemProps;

    const [theAmount, setTheAmout] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

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

    function handleEntrance() {
        let newStorage = 0;
        if (Number(theAmount) > 0 && theAmount !== '') {
            newStorage = Number(storage) + Number(theAmount);
            updateItem(id, String(newStorage), theAmount, '1');
        } else {
            Alert.alert(
                "Desculpe",
                "O valor tem que ser positivo ou deve conter um valor.",
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
            updateItem(id, String(newStorage), theAmount, '2');
        } else {
            Alert.alert(
                "Desculpe",
                "O valor tem que ser positivo ou deve conter um valor.",
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

    async function updateItem(id: string, newStorage: string, theAmount: string, type: string) {
        const url = `${category}/${id}?type=${type}`;
        try {
            setLoading(true);
            if (Number(newStorage) > 0) {
                await api.put(url, {
                    storage: String(newStorage),
                    recordTheAmount: theAmount
                });
                setLoading(false);
                Alert.alert(
                    "OK",
                    "Alterações salvas.",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("ListItems", {
                                storage: newStorage
                            })
                        }
                    ],
                    {
                        cancelable: false
                    }
                );
            }

        } catch (error) {
            console.log(url);
        }
    }

    return (
        <SafeAreaView style={styles.constainer}>
            {
                loading ?
                    <ActivityIndicator size="large" color={colors.warning} /> :
                    <>
                        <KeyboardAvoidingView
                            style={styles.constainer}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss}
                            >
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.title}>
                                            {name}
                                        </Text>
                                        <Tag name={brand} />
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
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 25,
        textAlign: 'center'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20
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
        paddingTop: 10
    },
});