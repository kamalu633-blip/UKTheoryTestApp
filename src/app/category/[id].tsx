import { Redirect, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { DarkScreenShell } from '@/components/dark-screen-shell';
import { DashboardColors } from '@/constants/dashboard-theme';
import { isCategoryKey } from '@/constants/practice-categories';
import { Spacing } from '@/constants/theme';

export default function CategoryPracticeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  if (!id || !isCategoryKey(id)) {
    return <Redirect href="/" />;
  }

  return (
    <DarkScreenShell title={t(`categories.${id}`)}>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderText}>{t('practicePlaceholder')}</Text>
      </View>
    </DarkScreenShell>
  );
}

const styles = StyleSheet.create({
  placeholderCard: {
    flex: 1,
    backgroundColor: DashboardColors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DashboardColors.border,
    borderRadius: 10,
    padding: Spacing.four,
    justifyContent: 'center',
  },
  placeholderText: {
    color: DashboardColors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
