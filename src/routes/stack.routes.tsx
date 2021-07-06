import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ItemDetail } from '../screens/ItemDetail';
import { TabBotton } from './tabsBotton.routes';
import { RecordsList } from '../screens/RecordsList';

const Stack = createStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="ListItems"
                component={TabBotton}
            />
            <Stack.Screen
                name="ItemDetail"
                component={ItemDetail}
            />
            <Stack.Screen
                name="RecordsList"
                component={RecordsList}
            />
        </Stack.Navigator>
    );
}