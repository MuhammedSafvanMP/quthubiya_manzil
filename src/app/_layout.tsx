import { Stack } from "expo-router";
import { DrawerProvider } from "./lib/context/global";


export default function RootLayout() {
  return (
     <DrawerProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </DrawerProvider>
  )
}
