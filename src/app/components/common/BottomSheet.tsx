import { useRef } from "react";

import BottomSheet, { BottomSheetView } from "@expo/ui/community/bottom-sheet";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Check, X } from "lucide-react-native";

import { Reciter } from "../../../constants/reciters";
import { useDrawer } from "../../../lib/context/global";

type Props = {
  headingText: string;
  setSelectedReciter: (reciter: Reciter) => void;
  reciters: Reciter[];
  selectedReciter: Reciter;
};

export default function BottomSheetComponent({
  headingText,
  setSelectedReciter,
  reciters,
  selectedReciter,
}: Props) {
  const { sheetRef, setDropDownShow } = useDrawer();

  // Prevent multiple rapid selections
  const isSelecting = useRef(false);

  const closeSheet = () => {
    sheetRef.current?.close();
    setDropDownShow(false);
  };

  const handleSelectReciter = (reciter: Reciter) => {
    if (isSelecting.current) return;

    isSelecting.current = true;

    setSelectedReciter(reciter);
    closeSheet();

    // Allow selection again when the sheet is opened next time
    setTimeout(() => {
      isSelecting.current = false;
    }, 500);
  };

  return (
    <View>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={["25%", "50%", "90%"]}
        enablePanDownToClose
        onChange={(index) => {
          if (index === -1) {
            setDropDownShow(false);
            isSelecting.current = false;
          }
        }}
      >
        <BottomSheetView style={styles.sheetContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>{headingText}</Text>

            <Pressable
              style={styles.closeButton}
              onPress={closeSheet}
              accessibilityRole="button"
              accessibilityLabel="Close bottom sheet"
            >
              <X size={24} color="#000000" strokeWidth={2.2} />
            </Pressable>
          </View>

          {/* Reciters list */}
          <FlatList
            data={reciters}
            keyExtractor={(item) => String(item.id)}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            extraData={selectedReciter?.id}
            renderItem={({ item }) => {
              const isSelected = selectedReciter?.id === item.id;

              return (
                <Pressable
                  style={({ pressed }) => [
                    styles.reciterItem,
                    isSelected && styles.selectedItem,
                    pressed && styles.pressedItem,
                  ]}
                  onPress={() => handleSelectReciter(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${item.name}`}
                  accessibilityState={{
                    selected: isSelected,
                  }}
                >
                  <View style={styles.reciterInfo}>
                    <View
                      style={[
                        styles.reciterIcon,
                        isSelected && styles.selectedIcon,
                      ]}
                    >
                      <Text
                        style={[
                          styles.reciterInitial,
                          isSelected && styles.selectedInitial,
                        ]}
                      >
                        {item.name.charAt(0)}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.reciterName,
                        isSelected && styles.selectedName,
                      ]}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </View>

                  {isSelected && (
                    <Check size={21} color="#168568" strokeWidth={2.5} />
                  )}
                </Pressable>
              );
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  heading: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  closeButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#F3F4F6",
  },

  list: {
    flex: 1,
    width: "100%",
  },

  reciterItem: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },

  selectedItem: {
    borderColor: "#168568",
    backgroundColor: "#F0FAF6",
  },

  pressedItem: {
    opacity: 0.7,
  },

  reciterInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  reciterIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#F3F4F6",
  },

  selectedIcon: {
    backgroundColor: "#D7F3E8",
  },

  reciterInitial: {
    fontSize: 17,
    fontWeight: "700",
    color: "#6B7280",
  },

  selectedInitial: {
    color: "#168568",
  },

  reciterName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },

  selectedName: {
    color: "#168568",
    fontWeight: "700",
  },
});
