import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, ScrollView } from 'react-native';
import Card from '@/components/Card';
import ListItem from '@/components/ListItem';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';

export default function Profile() {
  const [alerts, setAlerts] = useState(true);
  const [priceDrops, setPriceDrops] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <Text style={styles.title}>Profile</Text>
        <Card variant="flat" style={styles.card}>
          <ListItem title="Name" subtitle="Demo User" leftIcon="person" />
          <ListItem title="Email" subtitle="user@example.com" leftIcon="email" />
        </Card>

        <Card variant="flat" style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>New listing alerts</Text>
          <Switch value={alerts} onValueChange={setAlerts} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price drop alerts</Text>
          <Switch value={priceDrops} onValueChange={setPriceDrops} />
        </View>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, gap: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.lg },
  card: { padding: spacing.lg, borderRadius: borderRadius.lg, gap: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  label: { ...typography.body, color: colors.textPrimary },
});
