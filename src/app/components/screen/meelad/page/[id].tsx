import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// IMPORTANT: Adjust this path to match where your JSON file is located relative to this component
import HomeBannerAd from "@/app/components/ads/HomeBannerAd";
import meeladData from "../../../../../constants/meelad_nabi.json";

// ---------- Type Definitions ----------
interface BaithLine {
  line_1: string;
  line_2: string;
}

interface ContentBaith {
  type: "baith";
  baith: BaithLine[];
}

interface ContentText {
  type: "text";
  text: string[];
}

interface ContentHeading {
  type: "heading";
  heading: string;
}

type ContentItem = ContentBaith | ContentText | ContentHeading;

interface MeeladItem {
  id: number;
  name: string;
  arabicName: string;
  subtext?: string;
  subtext_1?: string;
  subtext_2?: string;
  baith?: BaithLine[];
  content?: ContentItem[];
}

// ---------- Component ----------
const MeeladDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [meelad, setMeelad] = useState<MeeladItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeelad();
  }, [id]);

  const loadMeelad = () => {
    try {
      setLoading(true);
      const meeladId = Number(id);

      const foundMeelad = meeladData.data.meelad_nabi.find(
        (item) => item.id === meeladId,
      );

      if (foundMeelad) {
        setMeelad(foundMeelad as MeeladItem);
      } else {
        setMeelad(null);
      }
    } catch (error) {
      console.error("Failed to load Meelad:", error);
      setMeelad(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D81B60" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!meelad) {
    return (
      <View style={styles.center}>
        <Text>Meelad not found</Text>
        <TouchableOpacity onPress={handleClose} style={styles.errorButton}>
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---------- Renderers ----------

  // Render a flat list of baith (used for id 6 & 7) — normal black color
  // const renderBaithList = (baith: BaithLine[]) => {
  //   return baith.map((item, index) => (
  //     <View key={`baith-${index}`} style={styles.baithRow}>
  //       {item.line_1 ? (
  //         <Text style={[styles.verseText, styles.line1]}>{item.line_1}</Text>
  //       ) : null}
  //       {item.line_2 ? (
  //         <Text style={[styles.verseText, styles.line2]}>{item.line_2}</Text>
  //       ) : null}

  //       {/* Separator after every 10 baith, but not after the last one */}
  //       {(index + 1) % 10 === 0 && index !== baith.length - 1 && (
  //         <View style={styles.sectionDivider} />
  //       )}
  //     </View>
  //   ));
  // };

  // Render a flat list of baith — now includes subtext_1 / subtext_2
  const renderBaithList = (baith: BaithLine[]) => {
    return (
      <>
        {/* Render meelad-level subtexts once, above the baith list */}
        {meelad?.subtext_1 && (
          <Text style={styles.subtext}>{meelad.subtext_1}</Text>
        )}
        {meelad?.subtext_2 && (
          <Text style={styles.subtext}>{meelad.subtext_2}</Text>
        )}

        {baith.map((item, index) => (
          <View key={`baith-${index}`} style={styles.baithRow}>
            {item.line_1 ? (
              <Text style={[styles.verseText, styles.line1]}>
                {item.line_1}
              </Text>
            ) : null}
            {item.line_2 ? (
              <Text style={[styles.verseText, styles.line2]}>
                {item.line_2}
              </Text>
            ) : null}

            {(index + 1) % 10 === 0 && index !== baith.length - 1 && (
              <View style={styles.sectionDivider} />
            )}
          </View>
        ))}
      </>
    );
  };

  // Render the mixed content array (used for id 8 - Manqoos Moulid)
  const renderContent = (content: ContentItem[]) => {
    return content.map((block, index) => {
      // ----- Text block: JOIN all strings into ONE paragraph -----
      if (block.type === "text") {
        const fullText = block.text.join(" ");
        return (
          <Text key={`text-${index}`} style={styles.arabicParagraph}>
            {fullText}
          </Text>
        );
      }

      // ----- Baith block: MANQOOS BAITH → RED COLOR -----
      if (block.type === "baith") {
        return (
          <View key={`baith-group-${index}`} style={styles.baithGroup}>
            {block.baith.map((item, bIndex) => (
              <View key={`b-${bIndex}`} style={styles.baithRow}>
                {item.line_1 ? (
                  <Text
                    style={[
                      styles.verseText,
                      styles.line1,
                      styles.manqoosBaith,
                    ]}
                  >
                    {item.line_1}
                  </Text>
                ) : null}
                {item.line_2 ? (
                  <Text
                    style={[
                      styles.verseText,
                      styles.line2,
                      styles.manqoosBaith,
                    ]}
                  >
                    {item.line_2}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        );
      }

      // ----- Heading block -----
      if (block.type === "heading") {
        return (
          <View key={`heading-${index}`} style={styles.headingBlock}>
            <Text style={styles.headingText}>{block.heading}</Text>
            <View style={styles.headingUnderline} />
          </View>
        );
      }

      return null;
    });
  };

  // ---------- Main Render ----------
  const isManqoos = meelad.name === "Manqoos Moulid" && meelad.content;

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header Section --- */}
      <View style={styles.surahHeader}>
        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.surahName}>{meelad.arabicName}</Text>
        </View>

        {/* Bottom Lines */}
        <View style={styles.bottomLineContainer}>
          <View style={styles.bottomSmallLine} />
          <View style={styles.bottomMainLine} />
          <View style={styles.bottomSmallLine} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {meelad.subtext && (
          <Text style={styles.subtext}>{meelad?.subtext}</Text>
        )}

        <View style={styles.contentBox}>
          {isManqoos
            ? renderContent(meelad.content!)
            : meelad.baith
              ? renderBaithList(meelad.baith)
              : null}
        </View>
      </ScrollView>
      <HomeBannerAd />
    </SafeAreaView>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E6",
  },

  subtext: {
    textAlign: "center",
    fontSize: 22,
    color: "#B86B2E",
    fontWeight: "600",
    lineHeight: 26,
    marginBottom: 15,
    marginTop: 7,
  },

  // --- Header Styles ---
  surahHeader: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    right: 20,
    top: 0,
    zIndex: 10,
    padding: 5,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    fontSize: 22,
    color: "#B86B2E",
    fontWeight: "600",
    lineHeight: 26,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 75,
    paddingHorizontal: 40,
  },

  surahName: {
    fontSize: 34,
    color: "#111111",
    textAlign: "center",
    writingDirection: "rtl",
  },

  bottomLineContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomMainLine: {
    width: "72%",
    height: 2,
    backgroundColor: "#B86B2E",
    marginVertical: 4,
  },

  bottomSmallLine: {
    width: "45%",
    height: 1,
    backgroundColor: "#D9A56F",
  },

  // --- Loading / Error States ---
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#D81B60",
  },

  errorButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#D81B60",
    borderRadius: 5,
  },

  errorButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // --- Scroll Container ---
  scrollContainer: {
    paddingBottom: 40,
  },

  // --- Content Box ---
  contentBox: {
    marginHorizontal: 16,
    borderBottomWidth: 2,
    paddingVertical: 14,
    backgroundColor: "#FFF8E6",
  },

  // A single baith row (line_1 on top, line_2 below)
  baithRow: {
    width: "100%",
    marginBottom: 4,
  },

  baithGroup: {
    marginBottom: 12,
  },

  // Base Arabic text style
  verseText: {
    fontFamily: "Amiri-Regular",
    fontSize: 18,
    lineHeight: 30,
    writingDirection: "rtl",
    color: "#111111",
  },

  // line_1 — indented from the right
  line1: {
    textAlign: "right",
    paddingRight: 30,
    paddingLeft: 10,
  },

  // line_2 — indented from the left
  line2: {
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 30,
  },

  // --- Manqoos Baith Color (RED) ---
  manqoosBaith: {
    color: "#C62828",
  },

  // --- Section Divider (every 10 baith) ---
  sectionDivider: {
    width: "80%",
    height: 2,
    backgroundColor: "#000",
    marginVertical: 12,
    alignSelf: "center",
  },

  // --- Text Paragraphs (Manqoos prose) — stays black ---
  arabicParagraph: {
    fontFamily: "Amiri-Regular",
    fontSize: 20,
    lineHeight: 38,
    writingDirection: "rtl",
    textAlign: "right",
    color: "#111111",
    marginBottom: 16,
  },

  // --- Heading Block ---
  headingBlock: {
    alignItems: "center",
    marginVertical: 24,
  },

  headingText: {
    fontFamily: "Amiri-Regular",
    fontSize: 28,
    color: "#B86B2E",
    writingDirection: "rtl",
    textAlign: "center",
    fontWeight: "600",
  },

  headingUnderline: {
    width: "50%",
    height: 2,
    backgroundColor: "#B86B2E",
    marginTop: 8,
  },
});

export default MeeladDetails;
