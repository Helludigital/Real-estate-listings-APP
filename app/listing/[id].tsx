import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Card from '@/components/Card';
import ListItem from '@/components/ListItem';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';
import { useRealEstate } from '@/hooks/useRealEstate';

const { width: screenWidth } = Dimensions.get('window');

export default function ListingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { byId } = useRealEstate();
  const l = useMemo(() => (id ? byId(id) : undefined), [id, byId]);

  if (!l) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
      {/* Gallery */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.gallery}>
        {l.images.map((src, i) => (
          <Image key={i} source={{ uri: src }} style={styles.photo} />
        ))}
      </ScrollView>

      {/* Header */}
      <Card variant="flat" style={styles.header}>
        <Text style={styles.price}>€ {new Intl.NumberFormat('sv-SE').format(l.price)}</Text>
        <Text style={styles.title}>{l.title}</Text>
        <Text style={styles.sub}>{l.address.line1}, {l.address.city}</Text>
      </Card>

      {/* Facts */}
      <Card variant="flat" style={styles.card}>
        <ListItem title={`${l.beds} bedrooms`} leftIcon="single-bed" />
        <ListItem title={`${l.baths} bathrooms`} leftIcon="bathtub" />
        <ListItem title={`${l.areaSqm} m²`} leftIcon="crop-square" />
        {l.yearBuilt && <ListItem title={`Built ${l.yearBuilt}`} leftIcon="calendar-today" />}
        {l.isNew && <ListItem title="New listing" leftIcon="fiber-new" />}
      </Card>

      {/* Agent */}
      <Card variant="flat" style={styles.card}>
        <ListItem title={l.agent.name} subtitle={l.agent.email ?? ''} leftIcon="person" />
        <PrimaryButton title="Contact Agent" onPress={() => router.push(`/contact/${l.id}`)} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  gallery: { height: 280, backgroundColor: colors.border },
  photo: { width: screenWidth, height: 280 },
  header: { padding: spacing.lg, gap: spacing.xs, borderRadius: borderRadius.lg, margin: spacing.lg },
  price: { ...typography.title, color: colors.textPrimary },
  title: { ...typography.h2, color: colors.textPrimary },
  sub: { ...typography.body, color: colors.textSecondary },
  card: { marginHorizontal: spacing.lg, marginTop: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg },
});
