import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

import api from '../../services/api';
import colors from '../../styles/colors';
import { Picker } from '@react-native-picker/picker';

export function BrandCreate() {

    const [name, setName] = useState('');
    const [type, setType] = useState('1');
    const [loading, setLoading] = useState(false);

    async function saveItem() {
        setLoading(true);

        if (name === '') {
            Alert.alert(
                "Erro",
                "O nome não pode ficar em branco.",
                [
                    {
                        text: "Ok"
                    }
                ], {
                cancelable: true
            }
            );
            setLoading(false);
            return;
        }

        try {

            const result = api.post("brands", {
                name,
                type
            });

            if (result) {
                Alert.alert(
                    "Pronto",
                    "O produto foi cadastrado com sucesso.",
                    [
                        {
                            text: "Ok",
                        }
                    ],
                    {
                        cancelable: true
                    }
                );
                setLoading(false);
            }

        } catch (error) {
            Alert.alert(
                "Houve um erro",
                `${error}`
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <ActivityIndicator size="large" color={colors.warning} /> :
                    <>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 28,
                                fontWeight: 'bold'
                            }}>
                                Cadastro de Marca
                            </Text>
                        </View>
                        <View style={styles.inputContent}>
                            <View>
                                <Text style={{
                                    marginBottom: 10
                                }}>
                                    Nome da marca:
                                </Text>
                                <TextInput
                                    onChangeText={text => setName(String(text).toUpperCase())}
                                    maxLength={100}
                                    style={styles.input}
                                />
                                <Text style={{
                                    paddingTop: 10,
                                }}>
                                    Selecione o tipo da marca:
                                </Text>
                                <TouchableOpacity style={{
                                    backgroundColor: colors.gray,
                                    borderRadius: 15,
                                    marginTop: 10
                                }}>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={type}
                                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                                    >
                                        <Picker.Item label="Automotivos" value="1" />
                                        <Picker.Item label="Yales" value="2" />
                                    </Picker>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    paddingTop: 15
                                }}
                            >
                                <TouchableOpacity
                                    onPress={saveItem}
                                    style={styles.buttomSave}
                                >
                                    <Text
                                        style={{ color: colors.white }}
                                    >
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center'
    },
    inputContent: {
        width: '100%',
        padding: 15,
    },
    input: {
        backgroundColor: colors.gray,
        height: 40,
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%'
    },
    buttomSave: {
        height: 40,
        width: 90,
        backgroundColor: colors.warning,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    picker: {
        height: 40,
        backgroundColor: colors.gray
    }
});
