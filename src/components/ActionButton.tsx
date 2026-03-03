import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const nativeDriver = Platform.OS !== 'web';
import { Choice } from '../game/gameState';
import { THEME, useTheme } from '../theme';

interface ActionButtonProps {
  choice: Choice;
  index: number;
  onPress: (choiceId: string) => void;
}

export default function ActionButton({ choice, index, onPress }: ActionButtonProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();

  useEffect(() => {
    const delay = index * THEME.animation.buttonStaggerMs;
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: THEME.animation.buttonFadeInMs,
        useNativeDriver: nativeDriver,
      }).start();
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: nativeDriver }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: nativeDriver }),
    ]).start();
    onPress(choice.id);
  };

  const isPrimary = choice.weight !== 'secondary';

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <Pressable
        style={[
          styles.button,
          { borderColor: isPrimary ? colors.accent : colors.choiceBorder },
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.label,
            { color: isPrimary ? colors.accent : colors.textSecondary },
          ]}
        >
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
    backgroundColor: 'transparent',
  },
  label: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: THEME.typography.fontSize.choice,
  },
});
