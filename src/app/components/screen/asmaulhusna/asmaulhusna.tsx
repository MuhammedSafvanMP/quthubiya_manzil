
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AsmaulHusna = {
  id: number;
  arabic: string;
  transliteration: string;
  englishMeaning: string;
  malayalamMeaning: string;
};



export default function Asmaulhusna({ title, data, subtitle, name }: { title: string; data: AsmaulHusna[]; subtitle: string; name: string }) {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  const renderListItem = ({ item }: { item: AsmaulHusna }) => {
    return (
      <View style={styles.listItem}>
        {/* Number */}
        <View style={styles.listNumber}>
          <Text style={styles.listNumberText}>{item.id}</Text>
        </View>

        {/* Content */}
        <View style={styles.listContent}>
          <View style={styles.listTopRow}>
            <View style={styles.listNameContainer}>
              <Text style={styles.listArabic}>{item.arabic}</Text>

              <Text style={styles.listTransliteration}>
                {item.transliteration}
              </Text>
            </View>

            <Text style={styles.listMalayalam}>
              {item.malayalamMeaning}
            </Text>
          </View>

          <Text style={styles.listEnglish}>
            {item.englishMeaning}
          </Text>
        </View>
      </View>
    );
  };

  const renderCardItem = ({ item }: { item: AsmaulHusna }) => {
    return (
      <View style={styles.card}>
        {/* Number */}
        <View style={styles.cardNumber}>
          <Text style={styles.cardNumberText}>{item.id}</Text>
        </View>

        {/* Arabic */}
        <Text style={styles.cardArabic}>{item.arabic}</Text>

        {/* Transliteration */}
        <Text style={styles.cardTransliteration}>
          {item.transliteration}
        </Text>

        {/* English */}
        <Text style={styles.cardEnglish}>
          {item.englishMeaning}
        </Text>

        {/* Malayalam */}
        <Text style={styles.cardMalayalam}>
          {item.malayalamMeaning}
        </Text>
      </View>
    );
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Filter / View Control */}
      <View style={styles.filterCard}>
        <View>
          <Text style={styles.filterTitle}>Names of {name}</Text>
          <Text style={styles.filterSubtitle}>
            Choose your preferred view
          </Text>
        </View>

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          {/* List */}
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "list" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("list")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="list"
              size={20}
              color={viewMode === "list" ? "#FFFFFF" : "#555555"}
            />
          </TouchableOpacity>

          {/* Card */}
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "card" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("card")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="grid"
              size={19}
              color={viewMode === "card" ? "#FFFFFF" : "#555555"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {viewMode === "list" ? (
        <FlatList
          key="list"
          data={data}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          key="card"
          data={data}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardContainer}
          columnWrapperStyle={styles.cardRow}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  /* Header */

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#777777",
  },

  /* Filter */

  filterCard: {
    marginHorizontal: 14,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,

    backgroundColor: "#FFFFFF",
    borderRadius: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "#EAEAEA",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },

  filterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },

  filterSubtitle: {
    marginTop: 2,
    fontSize: 11,
    color: "#888888",
  },

  /* Toggle */

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 3,
  },

  toggleButton: {
    width: 38,
    height: 34,
    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",
  },

  activeToggle: {
    backgroundColor: "#1A1A1A",
  },

  /* List */

  listContainer: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  listItem: {
    minHeight: 88,

    backgroundColor: "#FFFFFF",
    borderRadius: 14,

    marginBottom: 10,
    padding: 12,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EAEAEA",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },

  listNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,

    backgroundColor: "#1A1A1A",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  listNumberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  listContent: {
    flex: 1,
  },

  listTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  listNameContainer: {
    flex: 1,
  },

  listArabic: {
    fontSize: 22,
    color: "#111111",
    textAlign: "left",
  },

  listTransliteration: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "600",
    color: "#555555",
  },

  listMalayalam: {
    maxWidth: "38%",
    marginLeft: 8,

    fontSize: 11,
    lineHeight: 17,
    color: "#333333",
    textAlign: "right",
  },

  listEnglish: {
    marginTop: 5,
    fontSize: 10,
    lineHeight: 14,
    color: "#888888",
  },

  /* Cards */

  cardContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  cardRow: {
    justifyContent: "space-between",
  },

  card: {
    width: "31.5%",
    minHeight: 190,

    backgroundColor: "#FFFFFF",
    borderRadius: 14,

    marginBottom: 10,
    paddingHorizontal: 7,
    paddingVertical: 12,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EAEAEA",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },

  cardNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,

    backgroundColor: "#1A1A1A",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
  },

  cardNumberText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  cardArabic: {
    fontSize: 21,
    color: "#111111",
    textAlign: "center",

    marginBottom: 6,
  },

  cardTransliteration: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",

    marginBottom: 7,
  },

  cardEnglish: {
    fontSize: 9.5,
    lineHeight: 13,
    color: "#666666",
    textAlign: "center",

    marginBottom: 7,
  },

  cardMalayalam: {
    fontSize: 10,
    lineHeight: 15,
    color: "#222222",
    textAlign: "center",
  },
});

