import React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Button,
    Platform
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Headers } from '../../components/Headers';
import api from '../../services/api';
import colors from '../../styles/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Ionicons } from '@expo/vector-icons';
import { Loading } from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';

interface IRecords {
    total: string;
    type_action: string;
    the_amount: string;
}

export function Records() {
    const [recordEntrance, setRecordEntrance] = useState<IRecords[]>([]);
    const [recordExited, setRecordExited] = useState<IRecords[]>([]);
    const [date_init, setDate_init] = useState('');
    const [date_final, setDate_final] = useState('');
    const [dateNow, setDateNow] = useState(new Date());
    const [showInitial, setShowInitial] = useState(false);
    const [showFinal, setShowFinal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    async function fetchRecordsTotalByTypeEntrance() {
        try {
            const url =
                `records/filter/date?date_init=${date_init}&date_final=${date_final}&type=1`;
            const { data } = await api.get(url);

            if (data) {
                setRecordEntrance(data);
                setLoading(false);
            }
        } catch (error) {
            throw error;
        }
    }

    async function fetchRecordsTotalByTypeExit() {
        try {
            const url =
                `records/filter/date?date_init=${date_init}&date_final=${date_final}&type=2`;
            const { data } = await api.get(url);

            if (data) {
                setRecordExited(data);
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    function handleDatePickerInitial(event?, selectedDate?) {
        setShowInitial(false);
        let date = new Date();
        date = selectedDate || date;
        setDate_init(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        );
    }

    function handleDatePickerFinal(event?, selectedDate?) {
        setShowFinal(false);
        let date = new Date();
        date = selectedDate || date;
        setDate_final(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        );
    }

    function handleRecordList(type: string) {
        navigation.navigate("RecordsList", { type, date_init, date_final });
    }

    function showDatePickerInitial() {
        setShowInitial(true);
    }

    function showDatePickerFinal() {
        setShowFinal(true);
    }

    function getRecords() {
        setLoading(true);
        fetchRecordsTotalByTypeEntrance();
        fetchRecordsTotalByTypeExit();
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <Loading /> :
                    <>
                        <Headers />
                        <View style={styles.content}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 25
                            }}>
                                Movimentações 💰
                            </Text>
                            <View style={styles.buttoms}>
                                <RectButton
                                    onPress={showDatePickerInitial}
                                    style={styles.rectButtonDate}
                                >
                                    <Text
                                        style={styles.rectButtonDateText}
                                    >
                                        Data Inicial
                                    </Text>
                                </RectButton>
                                <RectButton
                                    onPress={showDatePickerFinal}
                                    style={styles.rectButtonDate}
                                >
                                    <Text
                                        style={styles.rectButtonDateText}
                                    >
                                        Data Final
                                    </Text>
                                </RectButton>
                                <RectButton
                                    onPress={getRecords}
                                    style={styles.rectButtonDate}
                                >
                                    <Text
                                        style={styles.rectButtonDateText}
                                    >
                                        Buscar
                                    </Text>
                                </RectButton>
                            </View>
                            <View>
                                {
                                    showInitial && (
                                        <DateTimePicker
                                            value={dateNow}
                                            mode="date"
                                            onChange={handleDatePickerInitial}
                                        />
                                    )
                                }
                            </View>
                            <View>
                                {
                                    showFinal && (
                                        <DateTimePicker
                                            value={dateNow}
                                            mode="date"
                                            onChange={handleDatePickerFinal}
                                        />
                                    )
                                }
                            </View>
                            <RectButton
                                style={styles.rectButton}
                                onPress={() => handleRecordList(String(recordEntrance.map((item) => item.type_action)))}
                            >
                                <Text style={styles.title}>
                                    {recordEntrance.map((item) => item.type_action)}
                                </Text>
                                <View style={styles.rectButtonContent}>
                                    <View style={styles.theAmount}>
                                        <Text style={{ fontWeight: '600', fontSize: 15 }}>
                                            Entradas <Ionicons name="arrow-up-outline" size={20} color={colors.heading} />
                                        </Text>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                            {recordEntrance.map((item) => item.the_amount)}
                                        </Text>
                                    </View>
                                    <View style={styles.total}>
                                        <Text style={{ fontWeight: '600', fontSize: 15 }}>
                                            Total
                                        </Text>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                            {`R$ ${recordEntrance.map((item) => item.total)},00`}
                                        </Text>
                                    </View>
                                </View>
                            </RectButton>
                            <RectButton
                                style={styles.rectButton}
                                onPress={() => handleRecordList(String(recordExited.map((item) => item.type_action)))}
                            >
                                <Text style={styles.title}>
                                    {recordExited.map((item) => item.type_action)}
                                </Text>
                                <View style={styles.rectButtonContent}>
                                    <View style={styles.theAmount}>
                                        <Text style={{ fontWeight: '600', fontSize: 15 }}>
                                            Saídas
                                            <Ionicons name="arrow-down-outline" size={20} color={colors.heading} />
                                        </Text>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                            {recordExited.map((item) => item.the_amount)}
                                        </Text>
                                    </View>
                                    <View style={styles.total}>
                                        <Text style={{ fontWeight: '600', fontSize: 15 }}>
                                            Total
                                        </Text>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                            {`R$ ${recordExited.map((item) => item.total)},00`}
                                        </Text>
                                    </View>
                                </View>
                            </RectButton>
                        </View>
                    </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    rectButton: {
        height: 100,
        width: 300,
        backgroundColor: colors.gray,
        alignItems: 'center',
        marginTop: 15,
        padding: 10,
        borderRadius: 15,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    rectButtonContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    theAmount: {
        alignItems: 'center',
        padding: 10
    },
    total: {
        alignItems: 'center',
        padding: 10
    },
    buttoms: {
        flexDirection: 'row',
        alignContent: 'space-between',
        padding: 10
    },
    rectButtonDate: {
        flex: 1,
        backgroundColor: colors.warning,
        borderRadius: 15,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    rectButtonDateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    }
});