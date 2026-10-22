import {
  Amiri_400Regular,
  Amiri_700Bold,
  useFonts,
} from "@expo-google-fonts/amiri";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import majlisNoor from "../../../../constants/majlisnoor.json";
import AppBar from "../../common/AppBar";

const TextSection = ({ title, text, isHeader }: any) => (
  <View style={styles.sectionContainer}>
    {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
    {text ? (
      <Text style={[styles.arabicText, isHeader && styles.headerText]}>
        {text}
      </Text>
    ) : null}
  </View>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
  });

  if (!fontsLoaded) return null;

  const d = majlisNoor.data;
  const fatiha = majlisNoor.surah_al_fatiha;
  const ikhlas = majlisNoor.surah_al_ikhlas;
  const falaq = majlisNoor.surah_al_falaq;
  const nas = majlisNoor.surah_an_nas;
  const yaSin = majlisNoor.surah_ya_sin;
  const yaSinContinued = majlisNoor.surah_ya_sin_continued;
  const closingDua = majlisNoor.closing_dua;
  const colosingDuaHeading = majlisNoor.close_dua_heading;

  const textColumns = d?.text_columns ?? [];
  const totalColumns = textColumns.length;

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Majlisunoor" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextSection title={fatiha.title} text={fatiha.text} />
        <TextSection title={ikhlas.basmala} text={ikhlas.text} isHeader />

        <TextSection
          title={falaq.basmala}
          text={falaq.verses.join(" ")}
          isHeader
        />
        <TextSection title={nas.basmala} text={nas.verses.join(" ")} isHeader />

        <TextSection text={d.dua.text} title={d.dua_heading} isHeader />
        <Text style={styles.mainHeader}>{d.header}</Text>

        <View style={styles.shahadaContainer}>
          {d.shahada.map((line, index) => (
            <Text key={`shahada-${index}`} style={styles.shahadaText}>
              {line}
            </Text>
          ))}
        </View>

        <View style={styles.twoColumnContainer}>
          {textColumns.map((item: any, index) => (
            <View key={`baith-${index}`} style={styles.baithRow}>
              {item?.line_1 ? (
                <Text style={[styles.verseText, styles.line1]}>
                  {item?.line_1}
                </Text>
              ) : null}
              {item?.line_2 ? (
                <Text style={[styles.verseText, styles.line2]}>
                  {item.line_2}
                </Text>
              ) : null}
              {(index + 1) % 12 === 0 && index !== totalColumns - 1 && (
                <View style={styles.sectionDivider} />
              )}
            </View>
          ))}
        </View>

        <TextSection title={fatiha.title} text={fatiha.text} />
        <TextSection title={ikhlas.basmala} text={ikhlas.text} isHeader />

        <TextSection
          title={falaq.basmala}
          text={falaq.verses.join(" ")}
          isHeader
        />
        <TextSection title={nas.basmala} text={nas.verses.join(" ")} isHeader />

        <TextSection
          title={yaSin.basmala}
          text={yaSin.verses.join(" ")}
          isHeader
        />

        <TextSection text={yaSinContinued.verses.join(" ")} />

        <TextSection
          text={closingDua.text}
          title={colosingDuaHeading}
          isHeader
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  scrollContent: { padding: 20, paddingBottom: 50 },
  mainHeader: {
    fontFamily: "Amiri_700Bold",
    fontSize: 32,
    textAlign: "center",
    color: "#8B0000",
    marginVertical: 20,
  },
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
  // ✅ FIXED: no longer row-reverse — vertical stack of baithRows
  twoColumnContainer: {
    marginBottom: 40,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 20,
  },
  // ✅ FIXED: each baithRow stacks its two lines vertically
  baithRow: {
    width: "100%",
    marginBottom: 8,
  },
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
  sectionDivider: {
    width: "80%",
    height: 2,
    backgroundColor: "#000",
    marginVertical: 12,
    alignSelf: "center",
  },
});
