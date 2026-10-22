import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { DrawerProvider } from "../lib/context/global";

export default function RootLayout() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  return (
    <DrawerProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </DrawerProvider>
  );
}
