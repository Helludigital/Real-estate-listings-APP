import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const PrimaryButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  tone = 'brand',
  disabled = false,
  accessibilityLabel,
  style,
}: PrimaryButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.textDisabled;
    switch (tone) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'danger': return colors.error;
      case 'neutral': return colors.textSecondary;
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.background;
    if (variant === 'outline' || variant === 'ghost') {
      return getBackgroundColor();
    }
    return colors.background;
  };

  return (
    <Pressable
      style={[
        styles.button,
        styles[size],
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        { backgroundColor: variant === 'outline' || variant === 'ghost' ? 'transparent' : getBackgroundColor() },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      <Text style={[styles.text, { color: getTextColor() }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 52,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.body,
    fontWeight: '600',
  },
});

export default PrimaryButton;
