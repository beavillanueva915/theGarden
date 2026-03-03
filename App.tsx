import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './src/components/GameScreen';
import { ThemeProvider, useTheme } from './src/theme';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(e: Error) {
    return { error: e?.message ?? String(e) };
  }
  render() {
    if (this.state.error) {
      return (
        <View style={debug.box}>
          <Text style={debug.text}>Error: {this.state.error}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const debug = StyleSheet.create({
  box: { flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 24 },
  text: { color: '#f00', fontFamily: 'Georgia', fontSize: 14 },
});

function Root() {
  const { colors } = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <GameScreen />
    </View>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
