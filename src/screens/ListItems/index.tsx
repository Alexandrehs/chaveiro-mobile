import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Cards } from '../../components/Cards';

import { Headers } from '../../components/Headers';
import api from '../../services/api';

interface ItemProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    storage: number;
    minimum: number;
}

export function ListItems() {
    const [items, setItems] = useState<ItemProps[]>([]);

    async function fetcItems() {
        const { data } = await api.get("/items");

        if (data) {
            setItems(data);
        }
    }

    useEffect(() => {
        fetcItems();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Headers />
            </View>
            <View style={styles.itemsContainer}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Cards
                            name={item.name}
                            brand={item.brand}
                            price={item.price}
                            storage={item.storage}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {

    },
    itemsContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30
    },
});