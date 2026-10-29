export interface UmrahListItem {
  id: number;
  title: string;
  sub_list?: UmrahSubItem[];
}

export interface UmrahSubItem {
  id: number;
  title: string;
  action_icon?: string;
  has_sub_menu?: boolean;
  desc?: any;
  sub_list?: UmrahSubItem[];
}

export interface UmrahData {
  list_items: UmrahListItem[];
}
