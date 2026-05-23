import { type Href, Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DashboardColors } from '@/constants/dashboard-theme';
import {
  CATEGORY_COUNTS,
  CATEGORY_KEYS,
  type CategoryKey,
} from '@/constants/practice-categories';
import { BottomTabInset, Spacing } from '@/constants/theme';
import {
  type AppLocale,
  SUPPORTED_LOCALES,
  changeAppLanguage,
} from '@/i18n';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = SUPPORTED_LOCALES.find((l) => l.code === i18n.language);

  const selectLanguage = useCallback(async (code: AppLocale) => {
    await changeAppLanguage(code);
    setOpen(false);
  }, []);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('language')}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.langButton,
          pressed && styles.langButtonPressed,
        ]}>
        <Text style={styles.langButtonText}>{current?.label ?? i18n.language}</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalSheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>{t('language')}</Text>
            <FlatList
              data={SUPPORTED_LOCALES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => {
                const selected = i18n.language === item.code;
                return (
                  <Pressable
                    onPress={() => selectLanguage(item.code)}
                    style={({ pressed }) => [
                      styles.langOption,
                      selected && styles.langOptionSelected,
                      pressed && styles.langOptionPressed,
                    ]}>
                    <Text
                      style={[
                        styles.langOptionText,
                        selected && styles.langOptionTextSelected,
                      ]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function CategoryCard({ categoryKey }: { categoryKey: CategoryKey }) {
  const { t } = useTranslation();
  const count = CATEGORY_COUNTS[categoryKey];

  return (
    <Link href={`/category/${categoryKey}` as Href} asChild>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [styles.categoryCard, pressed && styles.categoryCardPressed]}>
        <Text style={styles.categoryTitle}>{t(`categories.${categoryKey}`)}</Text>
        <Text style={styles.categoryMeta}>{t('questions', { count })}</Text>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.appTitle}>{t('appTitle')}</Text>
            <Text style={styles.subtitle}>{t('subtitle')}</Text>
          </View>
          <LanguageSwitcher />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Link href="/mock-test" asChild>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}>
              <Text style={styles.primaryButtonText}>{t('startMockTest')}</Text>
            </Pressable>
          </Link>

          <Text style={styles.sectionTitle}>{t('practiceCategories')}</Text>

          <View style={styles.categoryGrid}>
            {CATEGORY_KEYS.map((key) => (
              <View key={key} style={styles.categoryCell}>
                <CategoryCard categoryKey={key} />
              </View>
            ))}
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  headerText: {
    flex: 1,
    gap: Spacing.one,
  },
  appTitle: {
    color: DashboardColors.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: DashboardColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  langButton: {
    backgroundColor: DashboardColors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DashboardColors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one + 2,
    maxWidth: 120,
  },
  langButtonPressed: {
    backgroundColor: DashboardColors.surface,
  },
  langButtonText: {
    color: DashboardColors.text,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
    gap: Spacing.four,
  },
  primaryButton: {
    backgroundColor: DashboardColors.accentMuted,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DashboardColors.accent,
    borderRadius: 10,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonText: {
    color: DashboardColors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: DashboardColors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.one,
  },
  categoryCell: {
    width: '50%',
    padding: Spacing.one,
  },
  categoryCard: {
    flex: 1,
    minHeight: 96,
    backgroundColor: DashboardColors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DashboardColors.border,
    borderRadius: 10,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  categoryCardPressed: {
    backgroundColor: DashboardColors.surface,
  },
  categoryTitle: {
    color: DashboardColors.text,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  categoryMeta: {
    color: DashboardColors.textMuted,
    fontSize: 12,
    marginTop: Spacing.two,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  modalSheet: {
    backgroundColor: DashboardColors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DashboardColors.border,
    borderRadius: 12,
    maxHeight: '70%',
    padding: Spacing.three,
  },
  modalTitle: {
    color: DashboardColors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  langOption: {
    borderRadius: 8,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  langOptionSelected: {
    backgroundColor: DashboardColors.accentMuted,
  },
  langOptionPressed: {
    backgroundColor: DashboardColors.surface,
  },
  langOptionText: {
    color: DashboardColors.text,
    fontSize: 15,
  },
  langOptionTextSelected: {
    color: DashboardColors.accent,
    fontWeight: '600',
  },
});
