import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import colors from '../../styles/colors';

interface HeadersProps extends TouchableOpacityProps {
    logo: boolean;
    del?: boolean;
}

export function Headers({ del, logo, ...rest }: HeadersProps) {
    return (
        <View style={styles.container}>
            {
                logo && <Image source={require('../../assets/logo.png')} style={styles.logo} />
            }
            {
                del && <>
                    <View style={styles.del}>
                        <TouchableOpacity
                            {...rest}
                        >
                            <Ionicons name="trash-outline" size={25} color={colors.warning} />
                        </TouchableOpacity>
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    logo: {
        height: 190,
        resizeMode: 'center'
    },
    del: {

    }
});