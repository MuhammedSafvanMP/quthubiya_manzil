import {
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from "react-native";
import jsonData from "../../../../constants/asmaul_badru.json";
import AppBar from "../../common/AppBar";

export default function AsmaulBadru() {
  const handleShare = async () => {
    try {
      const fullText =
        `${jsonData.title}\n\n${jsonData.bismillah}\n\n` +
        jsonData.data.map((item) => item.text).join("\n\n");
      await Share.share({ message: fullText });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title="Asmaul Badru" />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bismillah Card */}
        <View style={styles.bismillahCard}>
          <Text style={styles.bismillahText}>{jsonData.bismillah}</Text>
        </View>

        {/* Data Sections */}
        {jsonData.data.map((item, index) => (
          <View key={index} style={styles.duaCard}>
            <Text
              style={styles.arabicText}
              // Writing direction for Arabic
              // React Native doesn't have 'direction' in Text, but we can
              // use textAlign and writingDirection
              // For Android: textAlign: 'right'
              // For iOS: writingDirection: 'rtl'
            >
              {item.text}
            </Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>۞</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f0e8",
  },
  header: {
    backgroundColor: "#1a5276",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
    marginLeft: 30, // to balance share icon
  },
  shareButton: {
    padding: 6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // ── Bismillah Card ──
  bismillahCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#d4a017",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bismillahText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a5276",
    textAlign: "center",
    writingDirection: "rtl",
    lineHeight: 42,
  },

  // ── Dua Cards ──
  duaCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
    borderRightWidth: 4,
    borderRightColor: "#d4a017",
  },
  cardBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#d4a017",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  arabicText: {
    fontSize: 20,
    color: "#222",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 38,
    paddingTop: 24,
    fontWeight: "400",
  },

  // ── Footer ──
  footer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 30,
    color: "#d4a017",
  },
});
