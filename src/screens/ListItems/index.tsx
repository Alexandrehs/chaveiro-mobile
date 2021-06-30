import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    FlatList,
    TextInput
} from 'react-native';
import { Cards } from '../../components/Cards';

import { Headers } from '../../components/Headers';
import { Loading } from '../../components/Loading';
import { Tag } from '../../components/Tag';
import api from '../../services/api';
import colors from '../../styles/colors';

interface ItemProps {
    id: string;
    name: string;
    brandid: string;
    price: string;
    storage: string;
    minimum: string;
}

interface BrandProps {
    id: string;
    name: string;
}
export function ListItems() {
    const [items, setItems] = useState<ItemProps[]>([]);
    const [brands, setBrands] = useState<BrandProps[]>([]);
    const [brandSelected, setBrandSelected] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [itemsFiltered, setItemsFiltered] = useState<ItemProps[]>([]);
    const [query, setQuery] = useState<string>('');
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const flatListItemRef = useRef<FlatList>(null);

    async function fetchBrands() {
        try {
            const { data } = await api.get("brands");

            if (data) {
                setBrands([
                    {
                        id: 'all',
                        name: 'TODOS'
                    },
                    ...data
                ]);
            }
        } catch (error) {
        }
    }

    async function fetcItems() {
        try {
            const { data } = await api.get("items");

            if (data) {
                setItems(data);
                setLoading(false);
                setItemsFiltered(data);
            }
        } catch (error) {
            setLoading(true);
        }

    }

    function getBrandName(id: string) {
        let brandName = '...';
        brands.map((brand) => {
            if (brand.id === id) {
                brandName = brand.name
            }
        });
        return brandName;
    }

    function handleSelectItemsbyBrand(brand: string) {
        setBrandSelected(brand);
        if (brand === 'all')
            return setItemsFiltered(items);

        const itemsFilteredByBrand = items.filter(item =>
            item.brandid.includes(brand)
        );

        if (itemsFilteredByBrand)
            setItemsFiltered(itemsFilteredByBrand);

        flatListItemRef.current?.scrollToIndex({
            index: 0,
            animated: true
        })
    }

    function handleSearch(text: string) {
        if (text) {
            const searching = items.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });

            setItemsFiltered(searching);
            setQuery(text);
        } else {
            setQuery(text);
        }
    }

    function handleItemDetail(
        id: string,
        name: string,
        price: string,
        storage: string
    ) {
        navigation.navigate('ItemDetail', {
            id: id,
            name: name,
            price: price,
            storage: storage,
        });
    }

    useEffect(() => {
        fetchBrands();
        fetcItems();
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
                                data={brands}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <Tag
                                        name={item.name}
                                        onPress={() => handleSelectItemsbyBrand(item.id)}
                                        active={item.id === brandSelected}
                                    />
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.tags}
                            />
                        </View>
                        <View style={styles.itemsContainer}>
                            <FlatList
                                ref={flatListItemRef}
                                data={itemsFiltered}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <Cards
                                        id={item.id}
                                        name={item.name}
                                        brand={getBrandName(item.brandid)}
                                        price={String(item.price)}
                                        storage={item.storage}
                                        warning={Number(item.storage) <= Number(item.minimum)}
                                        onPress={() => handleItemDetail(
                                            item.id,
                                            item.name,
                                            item.price,
                                            item.storage
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
    itemsContainer: {
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