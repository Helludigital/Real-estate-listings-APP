import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';
import { useRealEstate, Filters } from '@/hooks/useRealEstate';

export default function FiltersScreen() {
  const { filters, setFilters } = useRealEstate();
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  function applyFilters() {
    setFilters(localFilters);
    router.back();
  }

  function resetFilters() {
    const reset: Filters = { sort: 'relevance' };
    setLocalFilters(reset);
  }

  function SegmentedControl({ options, value, onValueChange }: { 
    options: { label: string; value: string }[]; 
    value: string; 
    onValueChange: (value: string) => void 
  }) {
    return (
      <View style={styles.segmented}>
        {options.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.segment, value === option.value && styles.segmentActive]}
            onPress={() => onValueChange(option.value)}
          >
            <Text style={[styles.segmentText, value === option.value && styles.segmentTextActive]}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }

  function Slider({ label, value, onValueChange, min, max, step, format }: {
    label: string;
    value: number | undefined;
    onValueChange: (value: number | undefined) => void;
    min: number;
    max: number;
    step: number;
    format: (value: number) => string;
  }) {
    const steps = Math.floor((max - min) / step) + 1;
    const currentIndex = value ? Math.round((value - min) / step) : 0;

    return (
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderLabel}>{label}</Text>
          <Text style={styles.sliderValue}>{value ? format(value) : 'Any'}</Text>
        </View>
        <View style={styles.sliderTrack}>
          <View style={styles.sliderLine} />
          {Array.from({ length: steps }, (_, i) => {
            const stepValue = min + i * step;
            const isActive = value && stepValue <= value;
            return (
              <Pressable
                key={i}
                style={[
                  styles.sliderStep,
                  { left: `${(i / (steps - 1)) * 100}%` },
                  isActive && styles.sliderStepActive,
                  currentIndex === i && styles.sliderStepCurrent,
                ]}
                onPress={() => onValueChange(i === 0 ? undefined : stepValue)}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Filters</Text>
        <Pressable onPress={resetFilters}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>
      </View>

      <Card variant="flat" style={styles.card}>
        <Text style={styles.sectionTitle}>Property Type</Text>
        <SegmentedControl
          options={[
            { label: 'Any', value: 'any' },
            { label: 'Apartment', value: 'apartment' },
            { label: 'House', value: 'house' },
            { label: 'Studio', value: 'studio' },
          ]}
          value={localFilters.type || 'any'}
          onValueChange={(value) => setLocalFilters({ ...localFilters, type: value as any })}
        />
      </Card>

      <Card variant="flat" style={styles.card}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <Slider
          label="Minimum Price"
          value={localFilters.minPrice}
          onValueChange={(value) => setLocalFilters({ ...localFilters, minPrice: value })}
          min={1000000}
          max={15000000}
          step={500000}
          format={(value) => `€ ${new Intl.NumberFormat('sv-SE').format(value)}`}
        />
        <Slider
          label="Maximum Price"
          value={localFilters.maxPrice}
          onValueChange={(value) => setLocalFilters({ ...localFilters, maxPrice: value })}
          min={1000000}
          max={15000000}
          step={500000}
          format={(value) => `€ ${new Intl.NumberFormat('sv-SE').format(value)}`}
        />
      </Card>

      <Card variant="flat" style={styles.card}>
        <Text style={styles.sectionTitle}>Bedrooms & Bathrooms</Text>
        <Slider
          label="Minimum Bedrooms"
          value={localFilters.beds}
          onValueChange={(value) => setLocalFilters({ ...localFilters, beds: value })}
          min={0}
          max={5}
          step={1}
          format={(value) => `${value}+`}
        />
        <Slider
          label="Minimum Bathrooms"
          value={localFilters.baths}
          onValueChange={(value) => setLocalFilters({ ...localFilters, baths: value })}
          min={1}
          max={4}
          step={1}
          format={(value) => `${value}+`}
        />
      </Card>

      <Card variant="flat" style={styles.card}>
        <Text style={styles.sectionTitle}>Sort By</Text>
        <SegmentedControl
          options={[
            { label: 'Relevance', value: 'relevance' },
            { label: 'Price ↑', value: 'price_asc' },
            { label: 'Price ↓', value: 'price_desc' },
            { label: 'Newest', value: 'newest' },
          ]}
          value={localFilters.sort}
          onValueChange={(value) => setLocalFilters({ ...localFilters, sort: value as any })}
        />
      </Card>

      <Card variant="flat" style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>New listings only</Text>
          <Pressable
            style={[styles.toggle, localFilters.onlyNew && styles.toggleActive]}
            onPress={() => setLocalFilters({ ...localFilters, onlyNew: !localFilters.onlyNew })}
          >
            {localFilters.onlyNew && <MaterialIcons name="check" size={16} color="#fff" />}
          </Pressable>
        </View>
      </Card>

      <PrimaryButton title="Apply Filters" onPress={applyFilters} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, paddingTop: spacing.xl },
  backButton: { padding: spacing.xs },
  title: { ...typography.h1, color: colors.textPrimary },
  reset: { ...typography.body, color: colors.primary },
  card: { margin: spacing.md, padding: spacing.lg, borderRadius: borderRadius.lg },
  sectionTitle: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.md },
  segmented: { flexDirection: 'row', backgroundColor: colors.border, borderRadius: borderRadius.md, padding: 2 },
  segment: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: borderRadius.sm },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { ...typography.caption, color: colors.textSecondary },
  segmentTextActive: { color: '#fff' },
  sliderContainer: { marginVertical: spacing.md },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sliderLabel: { ...typography.body, color: colors.textPrimary },
  sliderValue: { ...typography.caption, color: colors.textSecondary },
  sliderTrack: { height: 40, position: 'relative', justifyContent: 'center' },
  sliderLine: { height: 2, backgroundColor: colors.border, position: 'absolute', left: 0, right: 0 },
  sliderStep: { position: 'absolute', width: 16, height: 16, borderRadius: 8, backgroundColor: colors.border, marginLeft: -8, marginTop: -7 },
  sliderStepActive: { backgroundColor: colors.primary },
  sliderStepCurrent: { backgroundColor: colors.primary, transform: [{ scale: 1.2 }] },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { ...typography.body, color: colors.textPrimary },
  toggle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  toggleActive: { backgroundColor: colors.primary, borderColor: colors.primary },
});
