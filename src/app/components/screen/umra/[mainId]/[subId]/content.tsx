import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../../common/AppBar";
import UmrahContentRenderer from "../../UmrahContentRenderer";
import { getSubItem } from "../../utils/umrahData";

export default function ContentScreen() {
  const { mainId, subId } = useLocalSearchParams<{
    mainId: string;
    subId: string;
  }>();
  const item = getSubItem(mainId!, subId!);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title={item?.title ?? "Content"} showBack={true} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <UmrahContentRenderer desc={item?.desc} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
  scroll: { padding: 20, paddingBottom: 40 },
});
