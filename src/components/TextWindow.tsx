import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

interface TextWindowProps {
  historicalLines: string[];
  currentLines: string[];
  onComplete: () => void;
}

function useTypewriter(
  lines: string[],
  speedMs: number,
  paragraphPauseMs: number,
  onComplete: () => void,
): string[] {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Reset when the lines array reference changes (new node mounted)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    doneRef.current = false;
    setLineIndex(0);
    setCharCount(0);
  }, [lines]);

  useEffect(() => {
    if (doneRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (lineIndex >= lines.length) {
      doneRef.current = true;
      onCompleteRef.current();
      return;
    }

    const currentLine = lines[lineIndex];

    if (currentLine === '') {
      timerRef.current = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharCount(0);
      }, paragraphPauseMs);
    } else if (charCount < currentLine.length) {
      timerRef.current = setTimeout(() => {
        setCharCount((c) => c + 1);
      }, speedMs);
    } else {
      timerRef.current = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharCount(0);
      }, paragraphPauseMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lineIndex, charCount, lines, speedMs, paragraphPauseMs]);

  const revealedLines: string[] = [];
  for (let i = 0; i < Math.min(lineIndex, lines.length); i++) {
    revealedLines.push(lines[i]);
  }
  if (lineIndex < lines.length && lines[lineIndex] !== '') {
    revealedLines.push(lines[lineIndex].slice(0, charCount));
  }
  return revealedLines;
}

export default function TextWindow({ historicalLines, currentLines, onComplete }: TextWindowProps) {
  const scrollRef = useRef<ScrollView>(null);

  const revealedLines = useTypewriter(
    currentLines,
    THEME.animation.typewriterSpeedMs,
    THEME.animation.paragraphPauseMs,
    onComplete,
  );

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [revealedLines.length, historicalLines.length]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {historicalLines.map((line, i) =>
        line === '' ? (
          <View key={`h-gap-${i}`} style={styles.gap} />
        ) : (
          <Text key={`h-${i}`} style={[styles.text, styles.historical]}>
            {line}
          </Text>
        ),
      )}

      {historicalLines.length > 0 && revealedLines.length > 0 && (
        <View style={styles.nodeDivider} />
      )}

      {revealedLines.map((line, i) =>
        line === '' ? (
          <View key={`r-gap-${i}`} style={styles.gap} />
        ) : (
          <Text key={`r-${i}`} style={styles.text}>
            {line}
          </Text>
        ),
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: THEME.spacing.screenPadding,
    paddingTop: 60,
    paddingBottom: 16,
  },
  text: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: THEME.typography.fontSize.narrative,
    lineHeight: THEME.typography.lineHeight.narrative,
    color: THEME.colors.textPrimary,
    marginBottom: THEME.spacing.paragraphGap,
  },
  historical: {
    color: THEME.colors.historical,
  },
  gap: {
    height: 14,
  },
  nodeDivider: {
    height: 32,
  },
});
