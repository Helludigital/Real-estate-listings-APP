import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/colors';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import StatsCard from '../../components/StatsCard';
import ListItem from '../../components/ListItem';

export default function HomeScreen() {
  const sampleFeatures = [
    { id: '1', title: 'Beautiful Components', subtitle: 'Pre-built UI components' },
    { id: '2', title: 'Type-Safe', subtitle: 'Full TypeScript support' },
    { id: '3', title: 'Modern Routing', subtitle: 'Expo Router file-based routing' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card variant="flat">
          <Text style={styles.title}>Welcome to Your App 👋</Text>
          <Text style={styles.subtitle}>Start building something amazing with this template.</Text>
        </Card>

        <Card>
          <Text style={styles.section}>Template Features</Text>
          <StatsCard value="5+" label="Components" tone="brand" />
          <StatsCard value="100%" label="TypeScript" tone="success" trend="up" trendValue="Ready" />
          <PrimaryButton
            title="Explore Components"
            onPress={() => {
              // Navigate to explore screen or show components
              console.log('Exploring components...');
            }}
            style={{ marginTop: spacing.md }}
          />
        </Card>

        <Card>
          <Text style={styles.section}>What's Included</Text>
          {sampleFeatures.map((feature) => (
            <ListItem 
              key={feature.id} 
              title={feature.title} 
              subtitle={feature.subtitle} 
              leftIcon="check" 
              variant="chevron" 
            />
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textSecondary },
  section: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.md },
});
