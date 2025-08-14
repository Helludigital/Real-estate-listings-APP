import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/colors';
import PrimaryButton from './PrimaryButton';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  actionTitle?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  subtitle,
  actionTitle,
  onAction,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={icon as any}
        size={64}
        color={colors.textTertiary}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {actionTitle && onAction && (
        <PrimaryButton
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  icon: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.md,
  },
});

export default EmptyState;
