import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBannerAd from "../components/ads/HomeBannerAd";

const SettingsScreen = ({ navigation }: any) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out Quthubiy Manzil app! A privacy-focused app that doesn't collect any user data.\n\nDownload now!",
        title: "Quthubiy Manzil",
      });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const settingsItems = [
    {
      id: 1,
      title: "About",
      subtitle: "Learn more about Quthubiy Manzil",
      icon: "information-circle-outline",
      color: "#4A90E2",
      onPress: () => router.push("../components/screen/about/about"),
    },
    {
      id: 2,
      title: "Privacy Policy",
      subtitle: "Read our complete privacy policy",
      icon: "shield-checkmark-outline",
      color: "#34C759",
      onPress: () => router.push("../components/screen/privacy/privacy"),
    },
    {
      id: 3,
      title: "Share App",
      subtitle: "Share Quthubiy Manzil with friends",
      icon: "share-social-outline",
      color: "#FF9500",
      onPress: handleShare,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Quthubiy Manzil</Text>
        </View>

        <View style={styles.section}>
          {settingsItems.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Quthubiy Manzil. All rights reserved.
          </Text>
        </View>
      </ScrollView>
      <HomeBannerAd />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 4,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
});

export default SettingsScreen;
