import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, spacing, typography, borderRadius } from '@/styles/colors';
import { useRealEstate } from '@/hooks/useRealEstate';

export default function ContactAgent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { byId } = useRealEstate();
  const l = useMemo(() => (id ? byId(id) : undefined), [id, byId]);
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('user@example.com');
  const [msg, setMsg] = useState(`Hello, I'm interested in ${l?.title}. Can we schedule a viewing?`);

  if (!l) return null;

  function send() {
    // Demo-only: just show a confirmation. Replace with your backend later.
    Alert.alert('Message sent', `Your inquiry to ${l.agent.name} has been sent.`);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact {l.agent.name}</Text>
      <Card variant="flat" style={styles.card}>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={colors.textTertiary} />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.textTertiary} keyboardType="email-address" />
        <TextInput style={[styles.input, styles.area]} value={msg} onChangeText={setMsg} placeholder="Message" placeholderTextColor={colors.textTertiary} multiline />
      </Card>
      <PrimaryButton title="Send" onPress={send} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, gap: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary },
  card: { padding: spacing.lg, borderRadius: borderRadius.lg, gap: spacing.md },
  input: { ...typography.body, color: colors.textPrimary, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm },
  area: { minHeight: 120, textAlignVertical: 'top' },
});
