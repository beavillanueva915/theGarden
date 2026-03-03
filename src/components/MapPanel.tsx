import React from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GameFlags, Phase } from '../game/gameState';
import { THEME, ThemeKey, useTheme } from '../theme';

interface MapPanelProps {
  flags: GameFlags;
  phase: Phase;
  onNavigate: (nodeId: string) => void;
  onClose: () => void;
}

const THEME_LABELS: { key: ThemeKey; label: string }[] = [
  { key: 'evening-blue', label: 'evening blue' },
  { key: 'clean-dark', label: 'clean dark' },
  { key: 'soft-slate', label: 'soft slate' },
];

const TAPPABLE_PHASES: Phase[] = ['memory', 'realization', 'return'];

function canTap(phase: Phase): boolean {
  return TAPPABLE_PHASES.includes(phase);
}

export default function MapPanel({ flags, phase, onNavigate, onClose }: MapPanelProps) {
  const { colors, themeKey, setThemeKey } = useTheme();
  const tappable = canTap(phase);

  const showSundial = flags.noticedSundial;
  const showFlowers = flags.noticedFlowers;
  const showPath = flags.followedPath;
  const showGreenhouse = flags.wateredPlant || flags.readFirstLetter;

  function MapLocation({
    label,
    nodeId,
    visible,
  }: {
    label: string;
    nodeId: string;
    visible: boolean;
  }) {
    if (!visible) return <Text style={[styles.mapNode, { color: colors.surface }]}>{'[ · ]'}</Text>;

    if (tappable) {
      return (
        <TouchableOpacity onPress={() => { onNavigate(nodeId); onClose(); }}>
          <Text style={[styles.mapNode, styles.mapNodeTappable, { color: colors.accent, borderColor: colors.accentDim }]}>
            {'[ '}{label}{' ]'}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <Text style={[styles.mapNode, { color: colors.textSecondary }]}>
        {'[ '}{label}{' ]'}
      </Text>
    );
  }

  return (
    <View style={[styles.overlay, { backgroundColor: colors.background + 'F0' }]}>
      <View style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.choiceBorder }]}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textSecondary }]}>the garden</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeText, { color: colors.textSecondary }]}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          {/* Row 1: sundial */}
          <View style={styles.mapRow}>
            <View style={styles.mapSpacer} />
            <MapLocation label="sundial" nodeId="revisit_sundial" visible={showSundial} />
            <View style={styles.mapSpacer} />
          </View>

          {/* Connector */}
          {showSundial && (
            <View style={styles.mapRow}>
              <View style={styles.mapSpacer} />
              <Text style={[styles.mapConnector, { color: colors.historical }]}>|</Text>
              <View style={styles.mapSpacer} />
            </View>
          )}

          {/* Row 2: path — garden — flowers */}
          <View style={styles.mapRow}>
            <MapLocation label="path" nodeId="revisit_path" visible={showPath} />
            {showPath && (
              <Text style={[styles.mapConnectorH, { color: colors.historical }]}> — </Text>
            )}
            <Text style={[styles.mapNode, { color: colors.textSecondary }]}>[ garden ]</Text>
            {showFlowers && (
              <Text style={[styles.mapConnectorH, { color: colors.historical }]}> — </Text>
            )}
            <MapLocation label="flowers" nodeId="revisit_flowers" visible={showFlowers} />
          </View>

          {/* Connector */}
          {showGreenhouse && (
            <View style={styles.mapRow}>
              <View style={styles.mapSpacer} />
              <Text style={[styles.mapConnector, { color: colors.historical }]}>|</Text>
              <View style={styles.mapSpacer} />
            </View>
          )}

          {/* Row 3: greenhouse */}
          {showGreenhouse && (
            <View style={styles.mapRow}>
              <View style={styles.mapSpacer} />
              <MapLocation label="greenhouse" nodeId="revisit_greenhouse" visible={showGreenhouse} />
              <View style={styles.mapSpacer} />
            </View>
          )}
        </View>

        {tappable && (
          <Text style={[styles.hint, { color: colors.historical }]}>
            tap a location to revisit
          </Text>
        )}

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.choiceBorder }]} />

        {/* Appearance */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>appearance</Text>
        <View style={styles.themeRow}>
          {THEME_LABELS.map(({ key, label }) => (
            <Pressable
              key={key}
              onPress={() => setThemeKey(key)}
              style={[
                styles.themeButton,
                { borderColor: themeKey === key ? colors.accent : colors.choiceBorder },
              ]}
            >
              <Text
                style={[
                  styles.themeLabel,
                  { color: themeKey === key ? colors.accent : colors.textSecondary },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  panel: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 6,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: THEME.typography.fontSize.choice,
    letterSpacing: 1,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 20,
    lineHeight: 22,
  },
  mapContainer: {
    marginBottom: 8,
  },
  mapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  mapSpacer: {
    flex: 1,
  },
  mapNode: {
    fontFamily: 'Courier New',
    fontSize: 13,
  },
  mapNodeTappable: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 2,
  },
  mapConnector: {
    fontFamily: 'Courier New',
    fontSize: 13,
  },
  mapConnectorH: {
    fontFamily: 'Courier New',
    fontSize: 13,
  },
  hint: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  sectionLabel: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  themeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  themeLabel: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 12,
  },
});
