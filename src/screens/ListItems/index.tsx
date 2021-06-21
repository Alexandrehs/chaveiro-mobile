import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text
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
    price: number;
    storage: number;
    minimum: number;
}

interface BrandProps {
    id: string;
    name: string;
}

export function ListItems() {
    const [items, setItems] = useState<ItemProps[]>([]);
    const [brands, setBrands] = useState<BrandProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [itemsSelectedByBrands, setItemsSelectedByBrands] = useState<ItemProps[]>([]);

    async function fetchBrands() {
        try {
            const { data } = await api.get("brands");

            if (data) {
                setBrands([
                    {
                        id: 'all',
                        name: 'Todos'
                    },
                    ...data
                ]);
                setLoading(false);
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
                setItemsSelectedByBrands(data);
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
        setLoading(true);
        if (brand === 'all')
            return setItemsSelectedByBrands(items);

        const itemsFilteredByBrand = items.filter(item =>
            item.brandid.includes(brand)
        );

        if (itemsFilteredByBrand) {
            setLoading(false)
            setItemsSelectedByBrands(itemsFilteredByBrand);
        }
    }

    useEffect(() => {
        fetchBrands();
        fetcItems();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <Loading /> :
                    <>
                        <Headers />
                        <View>
                            <FlatList
                                data={brands}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <Tag
                                        name={item.name}
                                        onPress={() => handleSelectItemsbyBrand(item.id)}
                                    />
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.tags}
                            />
                        </View>
                        <View style={styles.itemsContainer}>
                            <FlatList
                                data={itemsSelectedByBrands}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <Cards
                                        id={item.id}
                                        name={item.name}
                                        brand={getBrandName(item.brandid)}
                                        price={String(item.price)}
                                        storage={String(item.storage)}
                                    />
                                )}
                                showsVerticalScrollIndicator={true}
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

});