import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import nombuData from "../../../../../constants/nombu.json";
import AppBar from "../../../common/AppBar";

// ---------- Helpers ----------

const getEnglishName = (item: any): string =>
  item?.name ??
  item?.title ??
  item?.title_malayalam ??
  item?.heading_malayalam ?? // 👈 added
  item?.title_arabic ??
  item?.arabic_title ??
  "";

const getArabicName = (item: any): string =>
  item?.arabicName ??
  item?.arabic_title ??
  item?.title_arabic ??
  item?.heading_arabic ?? // 👈 added
  "";

// Detect a "sunnah prayer timetable" section
const isPrayerSection = (s: any): boolean =>
  s &&
  typeof s === "object" &&
  (s.name !== undefined || s.before !== undefined || s.after !== undefined) &&
  !s.heading &&
  !s.heading_malayalam &&
  !s.text &&
  !s.malayalam;

// ---------- Normalizer ----------
// Converts the raw nombu.json item shape (description / niyyah[] /
// significance / supplications[] / prohibited_days[]) into the
// `sections` array shape that SectionRenderer understands.

function normalizeItem(item: any): any[] {
  const sections: any[] = [];

  // Heading shown once at the top of the body
  if (item.heading_malayalam && item.description) {
    sections.push({
      heading: item.heading_malayalam,
      text: item.description,
    });
  } else if (item.description) {
    sections.push({ text: item.description });
  }

  // Niyyah array (items 1–7)
  if (Array.isArray(item.niyyah)) {
    item.niyyah.forEach((n: any) => {
      sections.push({
        heading: n.type_malayalam ?? n.type,
        arabic: n.arabic,
        transliteration: n.malayalam_transliteration,
        meaningMalayalam: n.meaning,
      });
    });
  }

  // Significance (items 1–7)
  if (item.significance) {
    sections.push({
      heading: "വിശദീകരണം",
      text: item.significance,
    });
  }

  // Supplications (item 8)
  if (Array.isArray(item.supplications)) {
    item.supplications.forEach((s: any) => {
      sections.push({
        heading: s.section,
        arabic: s.arabic,
        transliteration: s.malayalam_transliteration,
        meaningMalayalam: s.meaning,
      });
    });
  }

  // Prohibited days (item 9)
  if (Array.isArray(item.prohibited_days)) {
    item.prohibited_days.forEach((d: any) => {
      sections.push({
        heading: `${d.id}. ${d.heading_malayalam} (${d.heading_arabic})`,
        text: d.description,
      });
    });
  }

  return sections;
}

// ---------- Reusable pieces ----------

function ArabicBlock({ text }: { text?: string | null }) {
  if (!text) return null;
  return (
    <View style={styles.arabicBox}>
      <Text style={styles.arabicText}>{text}</Text>
    </View>
  );
}

function MalayalamBlock({
  label,
  text,
}: {
  label?: string;
  text?: string | null;
}) {
  if (!text) return null;
  return (
    <View style={styles.malayalamBox}>
      {label ? <Text style={styles.subLabel}>{label}</Text> : null}
      <Text style={styles.malayalamText}>{text}</Text>
    </View>
  );
}

function MeaningBlock({ text }: { text?: string | null }) {
  if (!text) return null;
  return (
    <View style={styles.meaningBox}>
      <Text style={styles.meaningLabel}>Meaning</Text>
      <Text style={styles.meaningText}>{text}</Text>
    </View>
  );
}

function SectionHeading({ children }: { children: string }) {
  return <Text style={styles.sectionHeading}>{children}</Text>;
}

function BulletList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <View style={styles.listBox}>
      {items.map((it, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{it}</Text>
        </View>
      ))}
    </View>
  );
}

function StepList({ steps }: { steps: string[] }) {
  if (!steps?.length) return null;
  return (
    <View style={styles.listBox}>
      {steps.map((s, i) => (
        <View key={i} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{i + 1}</Text>
          </View>
          <Text style={styles.stepText}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

// ---------- Prayer Section Card ----------

function PrayerSectionCard({ section }: { section: any }) {
  return (
    <View style={styles.prayerCard}>
      <View style={styles.prayerHeader}>
        {section.id !== undefined ? (
          <View style={styles.number}>
            <Text style={styles.numberText}>{section.id}</Text>
          </View>
        ) : null}
        {section.name ? (
          <Text style={styles.prayerName}>{section.name}</Text>
        ) : null}
      </View>

      {section.before ? (
        <View style={styles.prayerPart}>
          <Text style={styles.prayerPartLabel}>
            Before — {section.before.type} ({section.before.rakahs} Rak'ahs)
          </Text>
          <ArabicBlock text={section.before.arabic} />
          <MalayalamBlock text={section.before.malayalam} />
          {section.before.meaning ? (
            <MeaningBlock text={section.before.meaning} />
          ) : null}
        </View>
      ) : null}

      {section.after ? (
        <View style={styles.prayerPart}>
          <Text style={styles.prayerPartLabel}>
            After — {section.after.type} ({section.after.rakahs} Rak'ahs)
          </Text>
          <ArabicBlock text={section.after.arabic} />
          <MalayalamBlock text={section.after.malayalam} />
          {section.after.meaning ? (
            <MeaningBlock text={section.after.meaning} />
          ) : null}
        </View>
      ) : null}

      {section.total ? (
        <Text style={styles.totalText}>Total: {section.total}</Text>
      ) : null}
    </View>
  );
}

// ---------- Section Renderer ----------

function SectionRenderer({ section }: { section: any }) {
  if (!section) return null;

  if (isPrayerSection(section)) {
    return <PrayerSectionCard section={section} />;
  }

  const heading =
    section.heading ??
    section.heading_malayalam ??
    section.title ??
    section.title_malayalam ??
    section.title_arabic ??
    null;

  if (Array.isArray(section.content)) {
    return (
      <View style={styles.sectionCard}>
        {heading ? <SectionHeading>{heading}</SectionHeading> : null}
        {section.content.map((c: any, i: number) => (
          <SectionRenderer key={i} section={c} />
        ))}
      </View>
    );
  }

  const bodyText = section.text ?? section.malayalam ?? null;

  // 👇 Guard: niyyah can be a string OR an array in various data shapes
  const niyyah = typeof section.niyyah === "string" ? section.niyyah : null;

  const arabic =
    section.arabic ??
    section.arabic_visible_text ??
    section.title_arabic ??
    null;

  const transliteration =
    section.transliteration ?? section.malayalam_transliteration ?? null;

  const meaning = section.meaning ?? null;
  const meaningMalayalam =
    section.meaning_malayalam ?? section.meaningMalayalam ?? null;

  const note = section.note ?? section.note_malayalam ?? null;
  const note2 = section.note2_malayalam ?? null;
  const source = section.source ?? null;

  const sunnah = section.sunnah_malayalam ?? null;
  const fard = section.fard_malayalam ?? null;

  const items = section.items ?? section.points_malayalam ?? null;
  const steps = section.steps ?? null;
  const rakats = section.rakats ?? null;

  const hasContent =
    heading ||
    bodyText ||
    niyyah ||
    arabic ||
    transliteration ||
    meaning ||
    meaningMalayalam ||
    note ||
    note2 ||
    source ||
    sunnah ||
    fard ||
    (Array.isArray(items) && items.length) ||
    (Array.isArray(steps) && steps.length) ||
    (Array.isArray(rakats) && rakats.length);

  if (!hasContent) return null;

  return (
    <View style={styles.sectionCard}>
      {heading ? <SectionHeading>{heading}</SectionHeading> : null}

      {bodyText ? <Text style={styles.bodyText}>{bodyText}</Text> : null}

      {niyyah ? <MalayalamBlock label="നിയ്യത്ത്" text={niyyah} /> : null}

      <ArabicBlock text={arabic} />

      {transliteration ? (
        <MalayalamBlock label="ഉച്ചാരണം" text={transliteration} />
      ) : null}

      <MalayalamBlock text={meaningMalayalam} />

      {meaning ? <MeaningBlock text={meaning} /> : null}

      {note ? <Text style={styles.noteText}>{note}</Text> : null}
      {note2 ? <Text style={styles.noteText}>{note2}</Text> : null}

      {source ? <Text style={styles.sourceText}>— {source}</Text> : null}

      {sunnah ? <MalayalamBlock label="സുന്നത്തുകൾ" text={sunnah} /> : null}

      {fard ? <MalayalamBlock label="ഫർളുകൾ" text={fard} /> : null}

      {Array.isArray(items) ? <BulletList items={items} /> : null}
      {Array.isArray(steps) ? <StepList steps={steps} /> : null}

      {Array.isArray(rakats) ? (
        <View style={styles.listBox}>
          {rakats.map((r: any, i: number) => (
            <View key={i} style={styles.rakatRow}>
              <Text style={styles.rakatLabel}>റക്അത്ത് {r.rakat}</Text>
              <Text style={styles.rakatSurah}>{r.surah}</Text>
              <Text style={styles.rakatOpening}>{r.opening}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

// ---------- Screen ----------

export default function NombuDetailPage() {
  const params = useLocalSearchParams<{ id: string }>();

  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const index = Number(idParam);

  const item = useMemo(() => {
    if (!Array.isArray(nombuData)) return null;

    if (Number.isNaN(index) || index < 1 || index > nombuData.length) {
      return null;
    }
    return nombuData[index - 1] as any;
  }, [index]);

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppBar title="Not found" showBack={true} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Content not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const arabicTitle = getArabicName(item);
  const englishTitle = getEnglishName(item);

  // 👇 Normalize raw JSON into a sections array when needed
  const sectionList: any[] = useMemo(() => {
    if (Array.isArray(item.sections)) return item.sections;
    if (Array.isArray(item.content)) return item.content;
    return normalizeItem(item);
  }, [item]);

  const isPrayerTable =
    sectionList.length > 0 && sectionList.every(isPrayerSection);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title={arabicTitle || "Niskaram"} showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {arabicTitle ? (
            <Text style={styles.headerArabic}>{arabicTitle}</Text>
          ) : null}
          {englishTitle ? (
            <Text style={styles.headerEnglish}>{englishTitle}</Text>
          ) : null}
        </View>

        {isPrayerTable ? (
          <>
            {sectionList.map((section: any, i: number) => (
              <PrayerSectionCard key={i} section={section} />
            ))}
          </>
        ) : sectionList.length > 0 ? (
          sectionList.map((section: any, i: number) => (
            <SectionRenderer key={i} section={section} />
          ))
        ) : (
          <Text style={styles.bodyText}>
            No content available for this item.
          </Text>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Styles ----------

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 16,
  },
  headerArabic: {
    fontSize: 28,
    color: "#111827",
    textAlign: "center",
    writingDirection: "rtl",
    lineHeight: 42,
    marginBottom: 4,
  },
  headerEnglish: {
    fontSize: 18,
    color: "#374151",
    textAlign: "center",
    fontWeight: "600",
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEF0F2",
  },

  sectionHeading: {
    fontSize: 17,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 10,
    textAlign: "center",
  },

  subLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 4,
  },

  bodyText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 8,
  },

  arabicBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  arabicText: {
    fontSize: 22,
    color: "#111827",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 38,
  },

  malayalamBox: { marginBottom: 10 },
  malayalamText: {
    fontSize: 15,
    color: "#1F2937",
    lineHeight: 24,
  },

  meaningBox: {
    backgroundColor: "#F0FDF4",
    borderLeftWidth: 3,
    borderLeftColor: "#166534",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  meaningLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  meaningText: {
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 22,
    fontStyle: "italic",
  },

  noteText: {
    fontSize: 13,
    color: "#92400E",
    backgroundColor: "#FEF3C7",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    lineHeight: 20,
  },

  sourceText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "right",
    marginTop: 4,
    fontStyle: "italic",
  },

  listBox: { marginBottom: 8 },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    color: "#166534",
    marginRight: 8,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#166534",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },

  rakatRow: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#166534",
  },
  rakatLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 4,
  },
  rakatSurah: {
    fontSize: 18,
    color: "#111827",
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 2,
  },
  rakatOpening: {
    fontSize: 15,
    color: "#374151",
    textAlign: "right",
    writingDirection: "rtl",
  },

  // Prayer card styles
  prayerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEF0F2",
  },
  prayerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 12,
  },
  number: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  prayerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  prayerPart: {
    marginBottom: 12,
    paddingLeft: 6,
    borderLeftWidth: 2,
    borderLeftColor: "#E5E7EB",
  },
  prayerPartLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 8,
    textAlign: "center",
  },
  totalText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginTop: 6,
  },
  dailyTotals: {
    backgroundColor: "#F0FDF4",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  dailyTotalsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 8,
    textAlign: "center",
  },
  dailyTotalsLine: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
    textAlign: "center",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#166534",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
