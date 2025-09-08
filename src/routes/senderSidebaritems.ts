import Create_Parcel from "@/pages/sender/Create_Parcel";
import type { ISidebarItems } from "@/types";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Parcel Management",

    items: [
      {
        title: "Create_Parcel",
        url: "/sender/create_parcel",
        component: Create_Parcel,
      },
    ],
  },
];
