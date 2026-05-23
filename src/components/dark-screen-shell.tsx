import { router } from 'expo-router';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DashboardColors } from '@/constants/dashboard-theme';
import { Spacing } from '@/constants/theme';

type DarkScreenShellProps = {
  title: string;
  children: ReactNode;
};

export function DarkScreenShell({ title, children }: DarkScreenShellProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('back')}
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
            <Text style={styles.backButtonText}>← {t('back')}</Text>
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DashboardColors.bg,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DashboardColors.border,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
    backgroundColor: DashboardColors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DashboardColors.border,
  },
  backButtonPressed: {
    backgroundColor: DashboardColors.surface,
  },
  backButtonText: {
    color: DashboardColors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    color: DashboardColors.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
    padding: Spacing.four,
  },
});
