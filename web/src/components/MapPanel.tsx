import React from 'react';
import { GameFlags, Phase, FlagKey } from '@game/gameState';
import { AppColors, ThemeKey } from '@theme';

interface Props {
  flags: GameFlags;
  phase: Phase;
  onNavigate: (nodeId: string) => void;
  onClose: () => void;
  colors: AppColors;
  themeKey: ThemeKey;
  setThemeKey: (k: ThemeKey) => void;
}

const THEMES: { key: ThemeKey; label: string }[] = [
  { key: 'evening-blue', label: 'evening blue' },
  { key: 'clean-dark', label: 'clean dark' },
  { key: 'soft-slate', label: 'soft slate' },
];

const TAPPABLE: Phase[] = ['memory', 'realization', 'return'];

export default function MapPanel({ flags, phase, onNavigate, onClose, colors, themeKey, setThemeKey }: Props) {
  const tappable = TAPPABLE.includes(phase);

  const locations: { id: string; label: string; nodeId: string; flag: FlagKey | null }[] = [
    { id: 'sundial',     label: 'sundial',     nodeId: 'revisit_sundial',     flag: 'noticedSundial' },
    { id: 'path',        label: 'path',        nodeId: 'revisit_path',        flag: 'followedPath' },
    { id: 'flowers',     label: 'flowers',     nodeId: 'revisit_flowers',     flag: 'noticedFlowers' },
    { id: 'greenhouse',  label: 'greenhouse',  nodeId: 'revisit_greenhouse',  flag: 'wateredPlant' },
  ];

  const visible = (flag: FlagKey | null) => flag ? flags[flag] : true;

  const nodeStyle = (show: boolean, tap: boolean): React.CSSProperties => ({
    fontFamily: 'Courier New, monospace',
    fontSize: 13,
    color: show ? (tap ? colors.accent : colors.textSecondary) : colors.surface,
    border: show && tap ? `1px solid ${colors.accentDim}` : 'none',
    borderRadius: 2,
    padding: show && tap ? '1px 4px' : 0,
    cursor: show && tap ? 'pointer' : 'default',
    WebkitTapHighlightColor: 'transparent',
    background: 'none',
  });

  const conn: React.CSSProperties = {
    fontFamily: 'Courier New, monospace',
    fontSize: 13,
    color: colors.historical,
  };

  function Loc({ id }: { id: string }) {
    const loc = locations.find(l => l.id === id)!;
    const show = visible(loc.flag);
    const tap = show && tappable;
    const label = `[ ${loc.label} ]`;
    if (tap) {
      return (
        <button style={nodeStyle(show, tap)} onClick={() => { onNavigate(loc.nodeId); onClose(); }}>
          {label}
        </button>
      );
    }
    return <span style={nodeStyle(show, false)}>{show ? label : '[ · ]'}</span>;
  }

  const showSundial = visible('noticedSundial');
  const showFlowers = visible('noticedFlowers');
  const showPath = visible('followedPath');
  const showGreenhouse = flags.wateredPlant || flags.readFirstLetter;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: colors.background + 'F0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100,
    }}
      onClick={onClose}
    >
      <div
        style={{
          width: '85%', maxWidth: 360,
          background: colors.surface,
          border: `1px solid ${colors.choiceBorder}`,
          borderRadius: 6, padding: 24,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: colors.textSecondary, letterSpacing: 1 }}>
            the garden
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textSecondary, fontSize: 20, cursor: 'pointer', padding: 4 }}>
            ×
          </button>
        </div>

        {/* Map */}
        <div style={{ fontFamily: 'Courier New, monospace', fontSize: 13, lineHeight: '22px', marginBottom: 8 }}>
          {showSundial && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
              <Loc id="sundial" />
            </div>
          )}
          {showSundial && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}><span style={conn}>|</span></div>}

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            {showPath && <><Loc id="path" /><span style={conn}> — </span></>}
            <span style={{ ...nodeStyle(true, false), color: colors.textSecondary }}>[ garden ]</span>
            {showFlowers && <><span style={conn}> — </span><Loc id="flowers" /></>}
          </div>

          {showGreenhouse && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}><span style={conn}>|</span></div>
              <div style={{ display: 'flex', justifyContent: 'center' }}><Loc id="greenhouse" /></div>
            </>
          )}
        </div>

        {tappable && (
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 11, color: colors.historical, textAlign: 'center', marginBottom: 4, fontStyle: 'italic' }}>
            tap a location to revisit
          </p>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: colors.choiceBorder, margin: '16px 0' }} />

        {/* Appearance */}
        <p style={{ fontFamily: 'Georgia, serif', fontSize: 11, color: colors.textSecondary, letterSpacing: 1, marginBottom: 10 }}>
          appearance
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          {THEMES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setThemeKey(key)}
              style={{
                flex: 1,
                padding: '8px 4px',
                background: 'transparent',
                border: `1px solid ${themeKey === key ? colors.accent : colors.choiceBorder}`,
                borderRadius: 4,
                color: themeKey === key ? colors.accent : colors.textSecondary,
                fontFamily: 'Georgia, serif',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
