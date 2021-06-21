import React from 'react';
import { Routes } from './src/routes';

import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import Apploading from 'expo-app-loading';

export default function App() {
  let [fonstLoaded] = useFonts({
    Pacifico_400Regular
  });

  if (!fonstLoaded) {
    return (
      <Apploading />
    );
  }

  return (
    <Routes />
  );
}