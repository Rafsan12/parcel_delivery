import Analytics from "@/pages/Admin/Analytics";
import Create_Parcel from "@/pages/Admin/Create_Parcel";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",

    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Parcel Management",

    items: [
      {
        title: "Create_Parcel",
        url: "/admin/create_parcel",
        component: Create_Parcel,
      },
    ],
  },
];
