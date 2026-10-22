import BottomSheet from "@expo/ui/community/bottom-sheet";
import React, { createContext, useContext, useRef, useState } from "react";
import { Reciter, RECITERS } from "../../constants/reciters";

type DrawerContextType = {
  showDrawer: boolean;
  setShowDrawer: (open: boolean) => void;
  sheetRef: any;
  openSheet: any;
  dropDownShow: boolean;
  setDropDownShow: (open: boolean) => void;
  setSelectedReciter: any;
  selectedReciter: any;
};

export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined,
);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropDownShow, setDropDownShow] = useState(false);

  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);

  const sheetRef = useRef<BottomSheet>(null);

  const openSheet = () => {
    sheetRef.current?.snapToIndex(0);
  };

  return (
    <DrawerContext.Provider
      value={{
        showDrawer,
        setShowDrawer,
        sheetRef,
        openSheet,
        dropDownShow,
        setDropDownShow,
        selectedReciter,
        setSelectedReciter,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}
