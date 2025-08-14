import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/colors';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { Link } from 'expo-router';

export default function NotFound() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Text style={styles.title}>Lost in space</Text>
        <Text style={styles.subtitle}>We couldn't find that screen.</Text>
        <Link href="/(tabs)" asChild>
          <PrimaryButton title="Go home" onPress={() => {}} />
        </Link>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { margin: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
});
