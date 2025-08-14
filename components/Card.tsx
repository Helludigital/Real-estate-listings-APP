import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../styles/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  accessibilityLabel?: string;
  variant?: 'elevated' | 'flat' | 'outlined';
  density?: 'comfortable' | 'compact';
}

const Card = ({
  children,
  style,
  onPress,
  accessibilityLabel,
  variant = 'elevated',
  density = 'comfortable',
}: CardProps) => {
  const cardStyle = [
    styles.card,
    density === 'compact' && styles.compact,
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    variant === 'flat' && styles.flat,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={cardStyle}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  compact: {
    padding: spacing.sm,
  },
  elevated: {
    ...shadows.medium,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  flat: {
    backgroundColor: colors.secondaryBackground,
  },
});

export default Card;
