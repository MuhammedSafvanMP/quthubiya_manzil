import raw from "../../../../../constants/hajju&umra.json";
import { UmrahData, UmrahListItem, UmrahSubItem } from "../types/umrah";

export const umrahData: UmrahData = raw as UmrahData;

export function getMainItem(id: string): UmrahListItem | undefined {
  return umrahData.list_items.find((i) => String(i.id) === id);
}

export function getSubItem(
  mainId: string,
  subId: string,
): UmrahSubItem | undefined {
  const main = getMainItem(mainId);
  return main?.sub_list?.find((s) => String(s.id) === subId);
}

export function getNestedItem(
  mainId: string,
  subId: string,
  nestedId: string,
): UmrahSubItem | undefined {
  const sub = getSubItem(mainId, subId);
  return sub?.sub_list?.find((n) => String(n.id) === nestedId);
}
