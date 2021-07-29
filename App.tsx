import React from 'react';
import { Routes } from './src/routes';
import { StatusBar, Platform } from 'react-native';

export default function App() {

	return (
		<>
			<StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "default"} />
			<Routes />
		</>
	);
}