import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Reciter, RECITERS } from "../../../../../../constants/reciters";
import { SurahDetail } from "../../../../../../services/quranApi";

import { SafeAreaView } from "react-native-safe-area-context";
import quranData from "../../../../../../constants/quran.json";
import { useDrawer } from "../../../../../../lib/context/global";
import AyahAudioPlayer from "../../../../../components/common/AyahAudioPlayer";
import BottomSheetComponent from "../../../../../components/common/BottomSheet";
import SurahBottomPlayer from "../../../../../components/common/SurahBottomPlayer";

type Ayah = {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
};

/**
 * Map reciter id → everyayah.com folder name
 * Adjust keys to match the actual `id` field in your RECITERS constant.
 */
const RECITER_PATHS: Record<string, string> = {
  alafasy: "Alafasy_128kbps",
  yasser: "Yasser_Ad-Dussary_128kbps",
  fares: "Fares_Abbad_64kbps",
  sudais: "Abdurrahmaan_As-Sudais_192kbps",
  bader: "Alafasy_128kbps",
};

export default function SurahAudioDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { openSheet, selectedReciter, setSelectedReciter } = useDrawer();
  const router = useRouter();

  const surahId = Number(id);

  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Load Quran text
   */
  useEffect(() => {
    if (!surahId) return;
    loadSurah();
  }, [surahId]);

  const loadSurah = async () => {
    try {
      setLoading(true);

      const surahId = Number(id);

      const foundSurah = quranData.data.surahs.find(
        (item) => item.number === surahId,
      );

      //   const data = await getSurah(surahId);
      //   setSurah(data[0]);

      if (foundSurah) {
        setSurah(foundSurah);
      } else {
        setSurah(null);
      }
    } catch (error) {
      console.error("Failed to load Surah:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Build everyayah.com URL for a given ayah.
   * Pattern: https://everyayah.com/data/{reciterFolder}/{SSS}{AAA}.mp3
   */
  const getVerseAudioUrl = useCallback(
    (ayahNumber: number): string | null => {
      if (!surahId || !selectedReciter) return null;

      const pS = surahId.toString().padStart(3, "0");
      const pA = ayahNumber.toString().padStart(3, "0");

      const reciterId =
        (selectedReciter as any).id ??
        (selectedReciter as any).slug ??
        (selectedReciter as any).key ??
        "";

      const reciterUrlPath = RECITER_PATHS[reciterId] ?? "Alafasy_128kbps";

      const verseAudioUrl = `https://everyayah.com/data/${reciterUrlPath}/${pS}${pA}.mp3`;

      return verseAudioUrl;
    },
    [surahId, selectedReciter],
  );

  /**
   * Reciter change handler
   */
  const handleReciterChange = (reciter: Reciter) => {
    setSelectedReciter(reciter);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A96738" />
        <Text style={styles.loadingText}>Loading Quran...</Text>
      </View>
    );
  }

  if (!surah) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Surah not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  /**
   * Individual Ayah
   */
  const renderAyah = ({ item }: { item: Ayah }) => {
    const audioUrl = getVerseAudioUrl(item.numberInSurah);

    return (
      <View style={styles.ayahCard}>
        <Text style={styles.arabicText}>
          {item.text}
          <Text style={styles.ayahNumber}>
            {"  "}﴿{toArabicNumber(item.numberInSurah)}﴾
          </Text>
        </Text>

        {audioUrl ? (
          <AyahAudioPlayer
            key={`${selectedReciter.name}-${item.numberInSurah}`}
            audioUrl={audioUrl}
            ayahNumber={item.numberInSurah}
          />
        ) : (
          <View style={styles.audioLoading}>
            <Text style={styles.audioLoadingText}>Audio unavailable</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>

        <Text style={styles.headerLabel}>THE HOLY QURAN</Text>

        <Text style={styles.surahName}>{surah.name}</Text>

        <View style={styles.headerLine} />

        {/* RECITER SELECTOR */}
        <Pressable style={styles.reciterButton} onPress={() => openSheet()}>
          <View style={styles.reciterLeft}>
            <View style={styles.reciterIcon}>
              <Text style={styles.reciterIconText}>♪</Text>
            </View>

            <View>
              <Text style={styles.reciterLabel}>RECITER</Text>
              <Text style={styles.reciterName} numberOfLines={1}>
                {selectedReciter.name}
              </Text>
            </View>
          </View>

          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <FlatList
          data={surah.ayahs}
          keyExtractor={(item) => String(item.numberInSurah)}
          renderItem={renderAyah}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <BottomSheetComponent
          headingText="Select Usthath"
          setSelectedReciter={setSelectedReciter}
          selectedReciter={selectedReciter}
          reciters={RECITERS}
        />
        <SurahBottomPlayer
          surahName={surah.name}
          surahNo={id}
          reciterName={selectedReciter.name}
        />
      </View>
    </SafeAreaView>
  );
}

function toArabicNumber(number: number) {
  const numbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return String(number)
    .split("")
    .map((digit) => numbers[Number(digit)])
    .join("");
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8E6",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E6",
  },

  loadingText: {
    marginTop: 10,
    color: "#8A6748",
    fontSize: 14,
  },

  backText: {
    color: "#A96738",
    marginTop: 12,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    alignItems: "center",
    backgroundColor: "#FFF8E6",
    borderBottomWidth: 1,
    borderBottomColor: "#EADCC8",
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 18,
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1E4D3",
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    fontSize: 18,
    color: "#A96738",
  },

  headerLabel: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#A96738",
    fontWeight: "600",
  },

  surahName: {
    marginTop: 12,
    fontSize: 32,
    color: "#30251C",
    textAlign: "center",
    writingDirection: "rtl",
  },

  headerLine: {
    width: 100,
    height: 2,
    backgroundColor: "#B86B2E",
    marginTop: 14,
  },

  ayahCount: {
    marginTop: 8,
    color: "#8A6748",
    fontSize: 13,
  },

  reciterButton: {
    width: "100%",
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: "#F7EDDF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  reciterLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  reciterIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E9D2B8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  reciterIconText: {
    fontSize: 19,
    color: "#A96738",
  },

  reciterLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: "#A88669",
    fontWeight: "700",
  },

  reciterName: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#30251C",
    maxWidth: 240,
  },

  chevron: {
    fontSize: 27,
    color: "#A96738",
    fontWeight: "300",
  },

  content: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
  },

  ayahCard: {
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFCF5",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EADCC8",
  },

  arabicText: {
    fontSize: 27,
    lineHeight: 52,
    color: "#242018",
    textAlign: "right",
    writingDirection: "rtl",
    fontWeight: "400",
  },

  ayahNumber: {
    fontSize: 19,
    color: "#A96738",
    fontWeight: "600",
  },

  audioLoading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 12,
  },

  audioLoadingText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#8A6748",
  },
});
