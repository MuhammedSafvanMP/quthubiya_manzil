import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { menu, menuIcons } from "../../constants/menu";
import quran from "../../constants/quran.json";
import HomeBannerAd from "../components/ads/HomeBannerAd";
import MenuButton from "../components/common/menuButton";
import ReminderCard from "../components/common/remainderCard";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;

const daysANDnumber = [
  {
    id: 1,
    day: "monday",
    surah: [36, 67, 56],
  },
  {
    id: 2,
    day: "tuesday",
    surah: [36, 67, 56],
  },
  {
    id: 3,
    day: "wednesday",
    surah: [36, 67, 56],
  },
  {
    id: 4,
    day: "thursday",
    surah: [36, 67, 56],
  },
  {
    id: 5,
    day: "friday",
    surah: [18, 55, 36, 67, 56],
  },
  { id: 6, day: "saturday", surah: [36, 67, 56] },
  {
    id: 7,
    day: "sunday",
    surah: [36, 67, 56],
  },
];

const surahColors: Record<string, [string, string]> = {
  "36": ["#4b5563", "#1f2937"],
  "55": ["#4c3b18", "#1a1a1a"],
  "67": ["#374151", "#111827"],
  "18": ["#3f3f46", "#18181b"],
};

export default function Index() {
  // Get all Surahs from the local Quran JSON.
  const allSurahs = quran.data.surahs;

  // Compare the configured Surah numbers with Quran JSON data.
  // This preserves the order configured for each day.
  const getDaySurahs = (surahNumbers: number[]) => {
    return surahNumbers
      .map((number) => allSurahs.find((surah: any) => surah.number === number))
      .filter(Boolean);
  };

  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const todayData = daysANDnumber.find((item) => item.day === today);

  const todaySurahs = getDaySurahs(todayData?.surah ?? []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Assalamu Alaikum</Text>
          <Text style={styles.appTitle}>Quthubiya Manzil</Text>
        </View>

        {/* Friday Reminder */}
        <Text style={styles.sectionTitle}>
          {today.charAt(0).toUpperCase() + today.slice(1)} Reminder
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.remindersRow}
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
        >
          {todaySurahs.map((surah: any) => (
            <ReminderCard
              key={surah.number}
              id={surah.number}
              width={CARD_WIDTH}
              title={`Surah ${surah.englishName}`}
              surahNum={String(surah.number)}
              arabicText={surah.name}
              reciter={surah.revelationType}
              colors={
                surahColors[String(surah.number)] ?? ["#374151", "#111827"]
              }
            />
          ))}
        </ScrollView>

        {/* Categories Header */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>

          <Pressable
            style={styles.seeMore}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Text>See More</Text>
            <ChevronRight width={20} />
          </Pressable>
        </View>

        {/* Grid Menu */}
        <View style={styles.gridContainer}>
          {menu.slice(0, 8).map((v) => (
            <MenuButton key={v.id} icon={menuIcons[v.icon]} label={v.label} />
          ))}
        </View>
      </ScrollView>
      <HomeBannerAd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  scrollContent: {
    padding: 20,
    marginTop: 20,
  },

  header: {
    marginBottom: 16,
  },

  greeting: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },

  appTitle: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  remindersRow: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 12,
  },

  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },

  categoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  seeMore: {
    flexDirection: "row",
    alignItems: "center",
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
