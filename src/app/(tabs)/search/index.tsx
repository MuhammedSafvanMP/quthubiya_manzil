import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function SearchIndex() {
  return (
    <>
      <Stack.Title>Search</Stack.Title>
      <Stack.SearchBar
        placement="automatic"
        placeholder="Search"
        onChangeText={() => {}}
      />
      <ScrollView>{/* Screen content */}</ScrollView>
    </>
  );
}
