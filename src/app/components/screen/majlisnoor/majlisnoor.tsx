import {
  Amiri_400Regular,
  Amiri_700Bold,
  useFonts,
} from "@expo-google-fonts/amiri";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import majlisNoor from "../../../../constants/majlisnoor.json";
import HomeBannerAd from "../../ads/HomeBannerAd";
import AppBar from "../../common/AppBar";

/* ==========================================================
   Reusable Section Card
   ========================================================== */
type TextSectionProps = {
  title?: string;
  text?: string;
  isHeader?: boolean;
};

const TextSection = ({ title, text, isHeader }: TextSectionProps) => {
  if (!title && !text) return null;
  return (
    <View style={styles.sectionContainer}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {text ? (
        <Text style={[styles.arabicText, isHeader && styles.headerText]}>
          {text}
        </Text>
      ) : null}
    </View>
  );
};

/* ==========================================================
   Shahada / Divider block (used inside text_columns)
   ========================================================== */
const ShahadaBlock = ({ lines }: { lines: string[] }) => (
  <View style={styles.shahadaDividerContainer}>
    {lines.map((line, i) => (
      <Text key={`sh-${i}`} style={styles.shahadaDividerText}>
        {line}
      </Text>
    ))}
  </View>
);

/* ==========================================================
   Main App
   ========================================================== */
export default function App() {
  const [fontsLoaded] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
  });

  if (!fontsLoaded) return null;

  /* ---------- Typed access to JSON ---------- */
  const d = majlisNoor.data;

  // Surah cards
  const fatiha = (majlisNoor as any).surah_al_fatiha;
  const ikhlas = (majlisNoor as any).surah_al_ikhlas;
  const falaq = (majlisNoor as any).surah_al_falaq;
  const nas = (majlisNoor as any).surah_an_nas;
  const yaSin = (majlisNoor as any).surah_ya_sin;
  const yaSinContinued = (majlisNoor as any).surah_ya_sin_continued;
  const closingDuaHeading = (majlisNoor as any).close_dua_heading;
  const closingDua = (majlisNoor as any).closing_dua;

  /* ---------- text_columns ---------- */
  const textColumns: any[] = d?.text_columns ?? [];

  /* ==========================================================
     Render
     ========================================================== */
  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Majlisunoor" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- 1. Surah Al-Fatiha ---------- */}
        {fatiha ? (
          <TextSection title={fatiha.title} text={fatiha.text} />
        ) : null}

        {/* ---------- 2. Surah Al-Ikhlas ---------- */}
        {ikhlas ? (
          <TextSection title={ikhlas.basmala} text={ikhlas.text} isHeader />
        ) : null}

        {/* ---------- 3. Surah Al-Falaq ---------- */}
        {falaq ? (
          <TextSection
            title={falaq.basmala}
            text={falaq.verses.join(" ")}
            isHeader
          />
        ) : null}

        {/* ---------- 4. Surah An-Nas ---------- */}
        {nas ? (
          <TextSection
            title={nas.basmala}
            text={nas.verses.join(" ")}
            isHeader
          />
        ) : null}

        {/* ---------- 5. Dua ---------- */}
        {d?.dua ? (
          <TextSection title={d.dua_heading} text={d.dua.text} isHeader />
        ) : null}

        {/* ---------- 6. Main header ---------- */}
        {d?.header ? <Text style={styles.mainHeader}>{d.header}</Text> : null}

        {/* ---------- 7. Top shahada ---------- */}
        {Array.isArray(d?.shahada) && d.shahada.length > 0 ? (
          <View style={styles.shahadaContainer}>
            {d.shahada.map((line: string, index: number) => (
              <Text key={`shahada-${index}`} style={styles.shahadaText}>
                {line}
              </Text>
            ))}
          </View>
        ) : null}

        {/* ---------- 8. Text columns (poem + embedded shahada dividers) ---------- */}
        {textColumns.length > 0 ? (
          <View style={styles.twoColumnContainer}>
            {textColumns.map((item: any, index: number) => {
              // Shahada divider block
              if (Array.isArray(item?.shahada)) {
                return (
                  <ShahadaBlock key={`div-${index}`} lines={item.shahada} />
                );
              }
              // Regular baith row
              return (
                <View key={`baith-${index}`} style={styles.baithRow}>
                  {item?.line_1 ? (
                    <Text style={[styles.verseText, styles.line1]}>
                      {item.line_1}
                    </Text>
                  ) : null}
                  {item?.line_2 ? (
                    <Text style={[styles.verseText, styles.line2]}>
                      {item.line_2}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {/* ---------- 1. Surah Al-Fatiha ---------- */}
        {fatiha ? (
          <TextSection title={fatiha.title} text={fatiha.text} />
        ) : null}

        {/* ---------- 2. Surah Al-Ikhlas ---------- */}
        {ikhlas ? (
          <TextSection title={ikhlas.basmala} text={ikhlas.text} isHeader />
        ) : null}

        {/* ---------- 3. Surah Al-Falaq ---------- */}
        {falaq ? (
          <TextSection
            title={falaq.basmala}
            text={falaq.verses.join(" ")}
            isHeader
          />
        ) : null}

        {/* ---------- 4. Surah An-Nas ---------- */}
        {nas ? (
          <TextSection
            title={nas.basmala}
            text={nas.verses.join(" ")}
            isHeader
          />
        ) : null}

        {/* ---------- 9. Surah Ya Sin (part 1) ---------- */}
        {yaSin ? (
          <TextSection
            title={yaSin.basmala}
            text={yaSin.verses.join(" ")}
            isHeader
          />
        ) : null}

        {/* ---------- 10. Surah Ya Sin (continued) ---------- */}
        {yaSinContinued?.verses ? (
          <TextSection text={yaSinContinued.verses.join(" ")} />
        ) : null}

        {/* ---------- 11. Closing dua ---------- */}
        {closingDua ? (
          <TextSection
            title={closingDuaHeading}
            text={closingDua.text}
            isHeader
          />
        ) : null}
      </ScrollView>
      <HomeBannerAd />
    </SafeAreaView>
  );
}

/* ==========================================================
   Styles
   ========================================================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  scrollContent: { padding: 20, paddingBottom: 50 },

  /* --- Main header --- */
  mainHeader: {
    fontFamily: "Amiri_700Bold",
    fontSize: 32,
    textAlign: "center",
    color: "#8B0000",
    marginVertical: 20,
  },

  /* --- Top shahada card --- */
  shahadaContainer: {
    alignItems: "center",
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#FFE4E1",
    borderRadius: 10,
  },
  shahadaText: {
    fontFamily: "Amiri_700Bold",
    fontSize: 24,
    color: "#D32F2F",
    textAlign: "center",
    marginVertical: 2,
  },

  /* --- Shahada divider (inside poem) --- */
  shahadaDividerContainer: {
    alignItems: "center",
    marginVertical: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#FFF1E6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8C4A0",
  },
  shahadaDividerText: {
    fontFamily: "Amiri_700Bold",
    fontSize: 22,
    color: "#8B0000",
    textAlign: "center",
    marginVertical: 2,
  },

  /* --- Poem container --- */
  twoColumnContainer: {
    marginBottom: 40,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 20,
  },
  baithRow: {
    width: "100%",
    marginBottom: 8,
  },

  /* --- Section card --- */
  sectionContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: "Amiri_700Bold",
    fontSize: 24,
    textAlign: "center",
    color: "#8B0000",
    marginBottom: 10,
  },
  arabicText: {
    fontFamily: "Amiri_400Regular",
    fontSize: 22,
    textAlign: "right",
    color: "#222",
    lineHeight: 40,
  },
  headerText: { textAlign: "center", color: "#00008B" },

  /* --- Poem verse lines --- */
  verseText: {
    fontFamily: "Amiri_400Regular",
    fontSize: 18,
    lineHeight: 30,
    writingDirection: "rtl",
    color: "#111111",
  },
  line1: {
    textAlign: "right",
    paddingRight: 30,
    paddingLeft: 10,
  },
  line2: {
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 30,
  },
});
