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

import { Tag } from '../../components/Tag';
import api from '../../services/api';
import colors from '../../styles/colors';

interface IBrandsProps {
    id: string;
    name: string;
    type: string;
}

export function ItemCreate() {

    const [brands, setBrands] = useState<IBrandsProps[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [storage, setStorage] = useState('');
    const [minimum, setMinimum] = useState('');
    const [brand_id, setBrand_id] = useState('');
    const [brandType, setBrandType] = useState('');
    const [brandSelected, setBrandSelected] = useState('');
    const [loading, setLoading] = useState(true);

    async function fetchBrands() {
        try {
            const { data } = await api.get("brands/");

            if (data) {
                setBrands(data);
                setLoading(false);
            }

        } catch (error) {
            throw error;
        }
    }

    function handleSelectBrand(id: string, type: string) {
        setBrandSelected(id);
        setBrand_id(id);
        setBrandType(String(type));
    }

    async function saveItem() {
        setLoading(true);
        let url = '';

        if (brandType === '1') {
            url = "items";
        } else if (brandType === '2') {
            url = "yales";
        }
        try {
            const result = await api.post(url, {
                name,
                price,
                storage,
                minimum,
                brand_id,
                recordTheAmount: null
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

    useEffect(() => {
        fetchBrands();
    }, []);

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
                                Cadastro de Produto
                            </Text>
                        </View>
                        <View style={styles.inputContent}>
                            <View>
                                <Text style={{
                                    marginBottom: 10
                                }}>
                                    Nome do produto:
                                </Text>
                                <TextInput
                                    onChangeText={text => setName(String(text).toUpperCase())}
                                    maxLength={100}
                                    style={styles.input}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingVertical: 15,
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <View style={{
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            marginBottom: 10
                                        }}>
                                            Preço:
                                        </Text>
                                        <TextInput
                                            onChangeText={text => setPrice(text)}
                                            keyboardType="numeric"
                                            maxLength={3}
                                            style={[styles.input, { width: '100%' }]}
                                        />
                                    </View>
                                    <View style={{
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            marginBottom: 10
                                        }}>
                                            Estoque:
                                        </Text>
                                        <TextInput
                                            onChangeText={text => setStorage(text)}
                                            keyboardType="numeric"
                                            maxLength={3}
                                            style={[styles.input, { width: '100%' }]}
                                        />
                                    </View>
                                    <View style={{
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            marginBottom: 10
                                        }}>
                                            Minimo:
                                        </Text>
                                        <TextInput
                                            onChangeText={text => setMinimum(text)}
                                            keyboardType="numeric"
                                            maxLength={3}
                                            style={styles.input}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{
                                    marginBottom: 10
                                }}>
                                    Marca:
                                </Text>
                                <FlatList
                                    keyExtractor={(item) => String(item.id)}
                                    data={brands}
                                    renderItem={({ item }) => (
                                        <Tag
                                            name={item.name}
                                            onPress={() => handleSelectBrand(item.id, item.type)}
                                            active={item.id === brandSelected}
                                        />
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
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
                            <Text>{name}</Text>
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
        padding: 15
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
    }
});
