import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '@/components/Card';
import StatsCard from '@/components/StatsCard';
import PrimaryButton from '@/components/PrimaryButton';
import EmptyState from '@/components/EmptyState';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';
import { useRealEstate } from '@/hooks/useRealEstate';

export default function Home() {
  const { listings, query, setQuery, filters, setFilters, kpis, favorites, toggleFav } = useRealEstate();

  function Pill({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
    return (
      <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}>
        <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl * 2 }}>
        {/* KPIs */}
        <View style={styles.kpiRow}>
          <StatsCard value={`${kpis.count}`} label="Listings" />
          <StatsCard value={kpis.avgPriceText} label="Avg Price" />
          <StatsCard value={`${kpis.newCount}`} label="New Today" />
        </View>

      {/* Search */}
      <Card variant="flat" style={styles.searchCard}>
        <View style={styles.searchRow}>
          <MaterialIcons name="search" size={20} color={colors.textTertiary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by title or city"
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
          />
        </View>

        {/* Filter row */}
        <View style={styles.filterRow}>
          <Pill label="Any type" active={!filters.type || filters.type === 'any'}
            onPress={() => setFilters({ ...filters, type: !filters.type || filters.type === 'any' ? 'apartment' : 'any' })} />
          <Pill label="2+ beds" active={(filters.beds ?? 0) >= 2}
            onPress={() => setFilters({ ...filters, beds: (filters.beds ?? 0) >= 2 ? undefined : 2 })} />
          <Pill label="New" active={!!filters.onlyNew}
            onPress={() => setFilters({ ...filters, onlyNew: !filters.onlyNew })} />
          <Pressable onPress={() => router.push('/filters')} style={styles.filterButton}>
            <MaterialIcons name="tune" size={18} color={colors.textPrimary} />
            <Text style={styles.filterButtonText}>More Filters</Text>
          </Pressable>
        </View>
      </Card>

      {/* Results */}
      {listings.length === 0 ? (
        <EmptyState icon="home" title="No matches" subtitle="Try widening your filters." />
      ) : (
        <View style={{ gap: spacing.md }}>
          {listings.map(l => (
            <Card key={l.id} variant="elevated" style={styles.item}>
              <Pressable onPress={() => router.push(`/listing/${l.id}`)}>
                {/* hero image */}
                {l.images[0] ? (
                  <Image source={{ uri: l.images[0] }} style={styles.img} />
                ) : (
                  <View style={[styles.img, { backgroundColor: colors.border }]} />
                )}
                {/* meta */}
                <View style={styles.metaRow}>
                  <View style={{ flex: 1, gap: spacing.xs }}>
                    <Text style={styles.price}>€ {new Intl.NumberFormat('sv-SE').format(l.price)}</Text>
                    <Text style={styles.title}>{l.title}</Text>
                    <Text style={styles.sub}>{l.beds} bd • {l.baths} ba • {l.areaSqm} m² • {l.address.city}</Text>
                  </View>
                  <Pressable onPress={() => toggleFav(l.id)} hitSlop={8}>
                    <MaterialIcons
                      name={favorites.includes(l.id) ? 'favorite' : 'favorite-border'}
                      size={22}
                      color={favorites.includes(l.id) ? colors.error : colors.textSecondary}
                    />
                  </Pressable>
                </View>
              </Pressable>
            </Card>
          ))}
        </View>
      )}

      <PrimaryButton title="Open Map" onPress={() => router.push('/(tabs)/explore')} style={{ marginTop: spacing.lg }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  kpiRow: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.lg, marginTop: spacing.lg },
  searchCard: { marginBottom: spacing.lg },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, paddingBottom: 0 },
  searchInput: { ...typography.body, flex: 1, color: colors.textPrimary },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, padding: spacing.md, paddingTop: spacing.md },
  pill: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border },
  pillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  pillText: { ...typography.caption, color: colors.textPrimary },
  pillTextActive: { color: '#fff' },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.xs, paddingHorizontal: spacing.md, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border },
  filterButtonText: { ...typography.caption, color: colors.textPrimary },
  item: { borderRadius: borderRadius.lg, overflow: 'hidden' },
  img: { width: '100%', height: 160, borderTopLeftRadius: borderRadius.lg, borderTopRightRadius: borderRadius.lg },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  price: { ...typography.h2, color: colors.textPrimary },
  title: { ...typography.body, color: colors.textPrimary },
  sub: { ...typography.caption, color: colors.textSecondary },
});
