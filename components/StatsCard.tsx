import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/colors';
import Card from './Card';

interface StatsCardProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  kind?: 'value' | 'delta' | 'progress' | 'ring';
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
}

const StatsCard = ({
  value,
  label,
  trend,
  trendValue,
  kind = 'value',
  tone = 'neutral',
}: StatsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return colors.success;
      case 'down': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'trending-flat';
    }
  };

  const getValueColor = () => {
    switch (tone) {
      case 'brand': return colors.primary;
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'danger': return colors.error;
      default: return colors.textPrimary;
    }
  };

  return (
    <Card variant="elevated">
      <View style={styles.container}>
        <Text style={[styles.value, { color: getValueColor() }]}>
          {value}
        </Text>
        <Text style={styles.label}>{label}</Text>
        {trend && trendValue && (
          <View style={styles.trendContainer}>
            <MaterialIcons
              name={getTrendIcon() as any}
              size={16}
              color={getTrendColor()}
            />
            <Text style={[styles.trendValue, { color: getTrendColor() }]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  value: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  trendValue: {
    ...typography.caption,
    marginLeft: spacing.xs,
  },
});

export default StatsCard;
