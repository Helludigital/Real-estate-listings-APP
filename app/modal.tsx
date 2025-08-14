import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/colors';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={{ margin: spacing.lg }}>
        <Text style={styles.title}>Quick Action</Text>
        <Text style={styles.subtitle}>This is a modal route example.</Text>
        <PrimaryButton title="Close" onPress={() => router.back()} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
});
