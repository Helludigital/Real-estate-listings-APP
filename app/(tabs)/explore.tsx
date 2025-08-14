import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/colors';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import EmptyState from '../../components/EmptyState';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.section}>Explore Features</Text>
          <Text style={styles.description}>
            This is a template screen. Replace this content with your app's functionality.
          </Text>
          <PrimaryButton 
            title="Get Started" 
            onPress={() => {
              // Add your app logic here
              console.log('Getting started...');
            }} 
          />
        </Card>

        <Card>
          <EmptyState
            icon="explore"
            title="Ready to Build"
            subtitle="This template provides all the base components you need to build your app."
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  section: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.md },
  description: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
});
