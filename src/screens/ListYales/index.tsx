import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import {
    TextInput,
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { Cards } from '../../components/Cards';

import { Headers } from '../../components/Headers';
import { Loading } from '../../components/Loading';
import { Tag } from '../../components/Tag';
import api from '../../services/api';
import colors from '../../styles/colors';
import { ItemDetail } from '../ItemDetail';

interface BrandProps {
    id: string;
    name: string;
}

interface YalesProps {
    id: string;
    name: string;
    price: string;
    storage: string;
    minimum: string;
    brandid: string;
}

export function ListYales() {
    const [brands, setBrands] = useState<BrandProps[]>([]);
    const [brandSelected, setBrandSelected] = useState('all');
    const [yales, setYales] = useState<YalesProps[]>([])
    const [yalesFiltered, setYalesFiltered] = useState<YalesProps[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const flatListItemRef = useRef<FlatList>(null);

    async function fetchBrands() {
        try {
            const { data } = await api.get("brands/2");
            setBrands([
                {
                    id: "all",
                    name: "TODOS"
                },
                ...data
            ]);
        } catch (error) {
            throw error;
        }
    }

    async function fetchYales() {
        try {
            const { data } = await api.get("yales");
            setYales(data);
            setYalesFiltered(data);
            setLoading(false);
        } catch (error) {
            throw error;
        }
    }

    function getBrandName(id: string) {
        let brandName = "";
        brands?.map(brand => {
            if (brand.id === id)
                brandName = brand.name;
        });

        return brandName;
    }

    function handleSearch(text: string) {
        if (text) {
            const searching = yales?.filter((yale) => {
                const yaleData = yale.name ? yale.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();

                return yaleData.indexOf(textData) > -1;
            });

            setYalesFiltered(searching);
            setQuery(text);
        } else {
            setQuery(text);
        }
    }

    function handleItemDetail(
        id: string,
        name: string,
        price: string,
        storage: string,
        brand: string) {
        navigation.navigate("ItemDetail", {
            id,
            name,
            price,
            storage,
            brand,
            category: "yales"
        });
    }

    function handleYaleSelectedByBrand(brand: string) {
        flatListItemRef.current?.scrollToIndex({
            index: 0,
            animated: true
        });
        setBrandSelected(brand);
        if (brand === "all") {
            setYalesFiltered(yales);
            return;
        }

        const yaleFilteredByBrand = yales?.filter(yale =>
            yale.brandid.includes(brand)
        );

        if (yaleFilteredByBrand)
            setYalesFiltered(yaleFilteredByBrand);
    }

    useEffect(() => {
        fetchBrands();
        fetchYales();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <Loading /> :
                    <>
                        <Headers />
                        <View>
                            <View
                                style={styles.containerHeaderSearch}
                            >
                                <TextInput
                                    autoCorrect={false}
                                    value={query}
                                    onChangeText={text => handleSearch(text)}
                                    style={styles.inputHeaderSearch}
                                    placeholder="pesquisar"
                                />
                            </View>
                            <FlatList
                                keyExtractor={(item) => String(item.id)}
                                data={brands}
                                ref={flatListItemRef}
                                renderItem={({ item }) => (
                                    <Tag
                                        name={item.name}
                                        onPress={() => handleYaleSelectedByBrand(item.id)}
                                        active={item.id === brandSelected}
                                    />
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.tags}
                            />
                        </View>
                        <View style={styles.yalesContainer}>
                            <FlatList
                                keyExtractor={(item) => String(item.id)}
                                data={yalesFiltered}
                                renderItem={({ item }) => (
                                    <Cards
                                        name={item.name}
                                        price={item.price}
                                        storage={item.storage}
                                        brand={getBrandName(item.brandid)}
                                        id={item.id}
                                        warning={(Number(item.storage) <= Number(item.minimum))}
                                        onPress={() => handleItemDetail(
                                            item.id,
                                            item.name,
                                            item.price,
                                            item.storage,
                                            getBrandName(item.brandid)
                                        )}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: colors.white,
        justifyContent: 'space-between'
    },
    header: {
        height: 90,
        padding: 5,
    },
    yalesContainer: {
        flex: 1,
        paddingHorizontal: 15,
        width: '100%',
        marginTop: 10
    },
    tags: {
        padding: 5,
        marginTop: 20,
    },
    containerHeaderSearch: {
        flex: 1,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    inputHeaderSearch: {
        backgroundColor: colors.shape,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 15
    },
});