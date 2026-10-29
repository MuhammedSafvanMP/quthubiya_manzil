import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../../common/AppBar";
import UmrahContentRenderer from "../../UmrahContentRenderer";
import { getNestedItem } from "../../utils/umrahData";

export default function NestedContentScreen() {
  const { mainId, subId, nestedId } = useLocalSearchParams<{
    mainId: string;
    subId: string;
    nestedId: string;
  }>();
  const item = getNestedItem(mainId!, subId!, nestedId!);

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
