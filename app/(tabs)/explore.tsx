import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Card from '@/components/Card';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';
import { useRealEstate } from '@/hooks/useRealEstate';

export default function Explore() {
  const { listings } = useRealEstate();

  const markers = useMemo(() =>
    listings
      .filter(l => l.address.lat && l.address.lng)
      .map(l => ({ id: l.id, title: l.title, lat: l.address.lat!, lng: l.address.lng!, price: l.price })), [listings]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <Text style={styles.title}>Explore</Text>

        <Card variant="flat" style={styles.mapCard}>
        <Text style={styles.help}>Map integration is ready.</Text>
        <Text style={styles.small}>
          Install <Text style={{ fontFamily: 'monospace' }}>expo-maps</Text> and render markers from the prepared list.
        </Text>
      </Card>

      <Card variant="flat" style={styles.mapCard}>
        <Text style={styles.subtitle}>Markers (preview)</Text>
        {markers.map(m => (
          <Text key={m.id} style={styles.row}>{m.title} — {m.lat.toFixed(4)}, {m.lng.toFixed(4)} • € {new Intl.NumberFormat('sv-SE').format(m.price)}</Text>
        ))}
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, gap: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.lg },
  subtitle: { ...typography.h2, color: colors.textSecondary, marginBottom: spacing.sm },
  mapCard: { padding: spacing.lg, borderRadius: borderRadius.lg, gap: spacing.xs },
  help: { ...typography.body, color: colors.textPrimary },
  small: { ...typography.caption, color: colors.textTertiary },
  row: { ...typography.body, color: colors.textPrimary },
});
