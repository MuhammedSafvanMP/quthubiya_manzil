import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";

export default function ShahadaScreen() {
  const arabicText =
    "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ";

  const englishMeaning =
    "I bear witness that there is no god worthy of worship except Allah, and I bear witness that Muhammad is the Messenger of Allah.";

  const malayalamMeaning =
    "അല്ലാഹുവല്ലാതെ ആരാധനയ്ക്ക് അർഹനായ മറ്റൊരു ദൈവവുമില്ലെന്നും, മുഹമ്മദ് നബി ﷺ അല്ലാഹുവിന്റെ ദൂതനാണെന്നും ഞാൻ സാക്ഷ്യം വഹിക്കുന്നു.";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${arabicText}\n\nEnglish Meaning:\n${englishMeaning}\n\nMalayalam Meaning:\n${malayalamMeaning}`,
      });
    } catch (error) {
      console.log("Unable to share Shahada:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <AppBar title="Shahada" />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F7F2"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>
              ISLAMIC KNOWLEDGE
            </Text>

            <Text style={styles.headerTitle}>
              Shahada
            </Text>

            <Text style={styles.headerDescription}>
              The Declaration of Faith
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="moon"
              size={27}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* Main Arabic Card */}
        <View style={styles.mainCard}>
          <View style={styles.decorativeCircleOne} />
          <View style={styles.decorativeCircleTwo} />

          <View style={styles.bismillahBadge}>
            <Ionicons
              name="sparkles-outline"
              size={15}
              color="#D9C18B"
            />

            <Text style={styles.bismillahBadgeText}>
              DECLARATION OF FAITH
            </Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDiamond} />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.arabicText}>
            {arabicText}
          </Text>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDiamond} />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.arabicCaption}>
            الشَّهَادَةُ
          </Text>

          <Text style={styles.arabicTranslation}>
            Ash-Shahada
          </Text>
        </View>

        {/* English Meaning */}
        <View style={styles.meaningCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons
                name="book-outline"
                size={20}
                color="#176B52"
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>
                English Meaning
              </Text>

              <Text style={styles.sectionSubtitle}>
                Translation
              </Text>
            </View>
          </View>

          <View style={styles.meaningDivider} />

          <Text style={styles.englishText}>
            {englishMeaning}
          </Text>
        </View>

        {/* Malayalam Meaning */}
        <View style={styles.meaningCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons
                name="language-outline"
                size={20}
                color="#176B52"
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>
                Malayalam Meaning
              </Text>

              <Text style={styles.sectionSubtitle}>
                മലയാളം അർത്ഥം
              </Text>
            </View>
          </View>

          <View style={styles.meaningDivider} />

          <Text style={styles.malayalamText}>
            {malayalamMeaning}
          </Text>
        </View>

        {/* Reminder */}
        <View style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <Ionicons
              name="heart"
              size={19}
              color="#176B52"
            />
          </View>

          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>
              A Reminder of Faith
            </Text>

            <Text style={styles.reminderText}>
              The Shahada expresses belief in the oneness
              of Allah and the prophethood of Muhammad ﷺ.
            </Text>
          </View>
        </View>

      

        <Text style={styles.footer}>
          QUTHUBIYA MANZIL
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 23,
  },

  headerSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#648274",
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#173D30",
    marginTop: 5,
  },

  headerDescription: {
    fontSize: 13,
    color: "#7C8981",
    marginTop: 3,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#176B52",
    alignItems: "center",
    justifyContent: "center",
  },

  mainCard: {
    backgroundColor: "#124C3B",
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 27,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    minHeight: 300,
    justifyContent: "center",
  },

  decorativeCircleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    top: -95,
    right: -60,
  },

  decorativeCircleTwo: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    bottom: -150,
    left: -80,
  },

  bismillahBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },

  bismillahBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#E3D2A6",
    marginLeft: 7,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    marginVertical: 22,
  },

  dividerLine: {
    height: 1,
    flex: 1,
    backgroundColor: "rgba(226,211,169,0.35)",
  },

  dividerDiamond: {
    width: 7,
    height: 7,
    backgroundColor: "#D9C18B",
    transform: [{ rotate: "45deg" }],
    marginHorizontal: 10,
  },

  arabicText: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 57,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: true,
  },

  arabicCaption: {
    color: "#E5D2A1",
    fontSize: 19,
    textAlign: "center",
    writingDirection: "rtl",
  },

  arabicTranslation: {
    color: "#B9D0C5",
    fontSize: 12,
    marginTop: 7,
    letterSpacing: 1,
  },

  meaningCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    padding: 19,
    marginTop: 17,
    borderWidth: 1,
    borderColor: "#E9EDE7",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EAF3ED",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#243B30",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#8B968F",
    marginTop: 3,
  },

  meaningDivider: {
    height: 1,
    backgroundColor: "#EDF0EB",
    marginVertical: 15,
  },

  englishText: {
    fontSize: 15,
    lineHeight: 26,
    color: "#4B5951",
  },

  malayalamText: {
    fontSize: 16,
    lineHeight: 31,
    color: "#4B5951",
    textAlign: "left",
  },

  reminderCard: {
    marginTop: 17,
    padding: 16,
    backgroundColor: "#E8F1E9",
    borderRadius: 19,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  reminderIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  reminderContent: {
    flex: 1,
  },

  reminderTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#214A38",
  },

  reminderText: {
    fontSize: 12,
    lineHeight: 20,
    color: "#64776B",
    marginTop: 5,
  },

  shareButton: {
    height: 53,
    borderRadius: 17,
    backgroundColor: "#176B52",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 21,
  },

  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 9,
  },

  footer: {
    textAlign: "center",
    fontSize: 9,
    letterSpacing: 3,
    color: "#9AA69E",
    fontWeight: "700",
    marginTop: 22,
  },
});