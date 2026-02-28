import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Choice } from '../game/gameState';
import { THEME } from '../theme';

interface ActionButtonProps {
  choice: Choice;
  index: number;
  onPress: (choiceId: string) => void;
}

export default function ActionButton({ choice, index, onPress }: ActionButtonProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const delay = index * THEME.animation.buttonStaggerMs;
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: THEME.animation.buttonFadeInMs,
        useNativeDriver: true,
      }).start();
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onPress(choice.id);
  };

  const isPrimary = choice.weight !== 'secondary';

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <Pressable
        style={[styles.button, isPrimary ? styles.primary : styles.secondary]}
        onPress={handlePress}
      >
        <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
          {choice.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: THEME.spacing.choiceVerticalPad,
    paddingHorizontal: THEME.spacing.choiceHorizontalPad,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: THEME.spacing.choiceGap,
  },
  primary: {
    borderColor: THEME.colors.accent,
    backgroundColor: 'transparent',
  },
  secondary: {
    borderColor: THEME.colors.choiceBorder,
    backgroundColor: 'transparent',
  },
  label: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: THEME.typography.fontSize.choice,
  },
  labelPrimary: {
    color: THEME.colors.accent,
  },
  labelSecondary: {
    color: THEME.colors.textSecondary,
  },
});
