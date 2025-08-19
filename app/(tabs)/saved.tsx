import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';
import { useRealEstate } from '@/hooks/useRealEstate';
import { router } from 'expo-router';

export default function Saved() {
  const { saved } = useRealEstate();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <Text style={styles.title}>Saved homes</Text>
        {saved.length === 0 ? (
          <EmptyState icon="favorite-border" title="No saved homes" subtitle="Tap the heart on a listing to save it." />
        ) : (
          <View style={{ gap: spacing.md }}>
            {saved.map(l => (
            <Card key={l.id} variant="elevated" style={styles.item}>
              <Pressable onPress={() => router.push(`/listing/${l.id}`)}>
                {l.images[0] ? <Image source={{ uri: l.images[0] }} style={styles.img} /> : <View style={[styles.img, { backgroundColor: colors.border }]} />}
                <View style={{ padding: spacing.md }}>
                  <Text style={styles.price}>€ {new Intl.NumberFormat('sv-SE').format(l.price)}</Text>
                  <Text style={styles.sub}>{l.beds} bd • {l.baths} ba • {l.areaSqm} m² • {l.address.city}</Text>
                </View>
              </Pressable>
            </Card>
          ))}
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, gap: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.lg },
  item: { borderRadius: borderRadius.lg, overflow: 'hidden' },
  img: { width: '100%', height: 120 },
  price: { ...typography.h2, color: colors.textPrimary },
  sub: { ...typography.caption, color: colors.textSecondary },
});
