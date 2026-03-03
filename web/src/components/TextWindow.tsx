import React, { useEffect, useRef, useState } from 'react';
import { AppColors } from '@theme';

interface Props {
  historicalLines: string[];
  currentLines: string[];
  onComplete: () => void;
  colors: AppColors;
}

function useTypewriter(lines: string[], onComplete: () => void): string[] {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  useEffect(() => { onCompleteRef.current = onComplete; });

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

    const line = lines[lineIndex];
    if (line === '') {
      timerRef.current = setTimeout(() => { setLineIndex(l => l + 1); setCharCount(0); }, 420);
    } else if (charCount < line.length) {
      timerRef.current = setTimeout(() => { setCharCount(c => c + 1); }, 35);
    } else {
      timerRef.current = setTimeout(() => { setLineIndex(l => l + 1); setCharCount(0); }, 420);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [lineIndex, charCount, lines]);

  const revealed: string[] = [];
  for (let i = 0; i < Math.min(lineIndex, lines.length); i++) revealed.push(lines[i]);
  if (lineIndex < lines.length && lines[lineIndex] !== '') {
    revealed.push(lines[lineIndex].slice(0, charCount));
  }
  return revealed;
}

export default function TextWindow({ historicalLines, currentLines, onComplete, colors }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const revealed = useTypewriter(currentLines, onComplete);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [revealed.length, historicalLines.length]);

  const textStyle: React.CSSProperties = {
    fontFamily: 'Georgia, serif',
    fontSize: 18,
    lineHeight: '28px',
    marginBottom: 8,
    whiteSpace: 'pre-wrap',
  };

  return (
    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '60px 24px 16px' }}>
      {historicalLines.map((line, i) =>
        line === '' ? (
          <div key={`h-gap-${i}`} style={{ height: 14 }} />
        ) : (
          <p key={`h-${i}`} style={{ ...textStyle, color: colors.historical }}>{line}</p>
        )
      )}

      {historicalLines.length > 0 && revealed.length > 0 && (
        <div style={{ height: 32 }} />
      )}

      {revealed.map((line, i) =>
        line === '' ? (
          <div key={`r-gap-${i}`} style={{ height: 14 }} />
        ) : (
          <p key={`r-${i}`} style={{ ...textStyle, color: colors.textPrimary }}>{line}</p>
        )
      )}
    </div>
  );
}
