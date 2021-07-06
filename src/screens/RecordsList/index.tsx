import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList
} from 'react-native';
import { Headers } from '../../components/Headers';
import api from '../../services/api';
import { RectButton } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { useEffect } from 'react';

interface IRecordsList {
    type: string;
    name: string;
    date_init: string;
    date_final: string;
    total: string;
    the_amount: string;
}

export function RecordsList() {
    const [records, setRecords] = useState<IRecordsList[]>([]);
    const routes = useRoute();
    const { type, date_init, date_final } = routes.params as IRecordsList;

    async function fetchRecords() {
        let type_action = '';
        try {
            if (type === 'entrada')
                type_action = '1';

            if (type === 'saida')
                type_action = '2';

            const url =
                `records/filter?date_init=${date_init}&date_final=${date_final}&type=${type_action}`;
            const { data } = await api.get(
                url
            );

            if (data) {
                setRecords(data);
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Headers />
            <View style={styles.container}>
                <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {type}
                    </Text>
                </View>
                <FlatList
                    keyExtractor={(item) => String(item.name)}
                    data={records}
                    renderItem={({ item }) => (
                        <RectButton
                            style={styles.rectButtom}
                        >

                            <View style={styles.titles}>
                                <Text style={styles.name}>
                                    {item.name}
                                </Text>
                            </View>

                            <View style={styles.details}>
                                <Text>
                                    Quantidade
                                </Text>
                                <Text style={styles.price}>
                                    {item.the_amount}
                                </Text>
                                <Text >
                                    Total
                                </Text>
                                <Text style={styles.price}>
                                    {`R$ ${item.total},00`}
                                </Text>
                            </View>
                        </RectButton>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titles: {
        flex: 1,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 30,
        textAlign: 'left',
        paddingBottom: 10

    },
    details: {
        alignItems: 'center',
        paddingLeft: 15
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    storage: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    rectButtom: {
        width: '100%',
        height: 150,
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.gray,
        marginVertical: 5,
    },
    list: {
        paddingHorizontal: 20
    }
});