import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './src/components/GameScreen';
import { THEME } from './src/theme';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
});
