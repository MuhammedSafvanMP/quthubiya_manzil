import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";

const { width } = Dimensions.get("window");

const AboutScreen = () => {
  const handleEmailPress = () =>
    Linking.openURL("mailto:support@quthubiymanzil.com");
  const handleWebsitePress = () => Linking.openURL("https://zorrowtech.in");

  const commitments = [
    { icon: "person-outline", text: "No personal information collected" },
    { icon: "analytics-outline", text: "No usage tracking or analytics" },
    { icon: "share-outline", text: "No data shared with third parties" },
    { icon: "key-outline", text: "No account registration required" },
    { icon: "phone-portrait-outline", text: "All data stays on your device" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="About" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HERO ===== */}
        <View style={styles.hero}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoInner}>
              <Ionicons name="book" size={44} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.appName}>Quthubiy Manzil</Text>
          <Text style={styles.tagline}>Privacy-first. Always.</Text>

          <View style={styles.versionPill}>
            <View style={styles.dot} />
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* ===== STATS ROW ===== */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Data Collected</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Trackers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>On-Device</Text>
          </View>
        </View>

        {/* ===== ABOUT ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ABOUT THE APP</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>
              Quthubiy Manzil is a privacy-first application built to give you a
              seamless experience without ever compromising your personal data.
              Your privacy is a fundamental right — and we built this app around
              that belief.
            </Text>
          </View>
        </View>

        {/* ===== COMMITMENTS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OUR COMMITMENT</Text>
          <View style={styles.card}>
            {commitments.map((item: any, index: any) => (
              <View
                key={index}
                style={[
                  styles.commitmentRow,
                  index !== commitments.length - 1 && styles.commitmentBorder,
                ]}
              >
                <View style={styles.commitmentIcon}>
                  <Ionicons name={item.icon} size={18} color="#2563EB" />
                </View>
                <Text style={styles.commitmentText}>{item.text}</Text>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              </View>
            ))}
          </View>
        </View>

        {/* ===== DEVELOPER CARD ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DEVELOPED BY</Text>
          <View style={styles.devCard}>
            {/* Decorative circle */}
            <View style={styles.devGlow} />

            <View style={styles.devTop}>
              <View style={styles.devLogo}>
                <Ionicons name="code-slash" size={22} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.devName}>Zorrow Tech</Text>
                <Text style={styles.devSub}>IT Solutions Pvt Ltd</Text>
              </View>
            </View>

            <Text style={styles.devDescription}>
              Crafting secure, innovative, and privacy-respecting digital
              products for users around the world.
            </Text>

            <View style={styles.devContact}>
              <TouchableOpacity
                style={styles.devContactRow}
                onPress={handleWebsitePress}
                activeOpacity={0.7}
              >
                <Ionicons name="globe-outline" size={16} color="#93C5FD" />
                <Text style={styles.devContactText}>zorrowtech.com</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.devContactRow}
                onPress={() => Linking.openURL("mailto:zorrowtech@gamil.com")}
                activeOpacity={0.7}
              >
                <Ionicons name="mail-outline" size={16} color="#93C5FD" />
                <Text style={styles.devContactText}>zorrowtech@gmail.com</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.devButton}
              onPress={handleWebsitePress}
              activeOpacity={0.85}
            >
              <Text style={styles.devButtonText}>Visit Website</Text>
              <Ionicons name="arrow-forward" size={16} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== CONTACT ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUPPORT</Text>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <View style={styles.supportIcon}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>Contact Support</Text>
              <Text style={styles.supportEmail}>
                support@quthubiymanzil.com
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Quthubiy Manzil
          </Text>
          <Text style={styles.footerSub}>
            A product of Zorrow Tech IT Solutions Pvt Ltd
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 40,
  },

  /* ---------- HERO ---------- */
  hero: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 28,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logoWrapper: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  logoInner: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.4,
  },
  tagline: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  versionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    marginTop: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },
  versionText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },

  /* ---------- STATS ---------- */
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 18,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },

  /* ---------- SECTIONS ---------- */
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
  },

  /* ---------- COMMITMENTS ---------- */
  commitmentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  commitmentBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  commitmentIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  commitmentText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },

  /* ---------- DEVELOPER CARD ---------- */
  devCard: {
    backgroundColor: "#1E3A8A",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    shadowColor: "#1E3A8A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  devGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#3B82F6",
    opacity: 0.25,
    top: -80,
    right: -60,
  },
  devTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  devLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  devName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  devSub: {
    fontSize: 12,
    color: "#BFDBFE",
    marginTop: 1,
    fontWeight: "500",
  },
  devDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#DBEAFE",
    marginBottom: 16,
  },
  devContact: {
    marginBottom: 16,
  },
  devContactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  devContactText: {
    fontSize: 13,
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "500",
  },
  devButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
  },
  devButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E3A8A",
    marginRight: 6,
  },

  /* ---------- SUPPORT ---------- */
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  supportIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  supportEmail: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  /* ---------- FOOTER ---------- */
  footer: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  footerLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  footerSub: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "center",
  },
});

export default AboutScreen;
