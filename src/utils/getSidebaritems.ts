import { role } from "@/contants/role";
import { adminSidebarItems } from "@/routes/AdminSidebaritems";
import { senderSidebarItems } from "@/routes/senderSidebaritems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  //   console.log(userRole);
  //   console.log(role.SUPER_ADMIN);
  switch (userRole) {
    case role.SUPER_ADMIN:
      return [...adminSidebarItems, ...senderSidebarItems];
    case role.ADMIN:
      return [...adminSidebarItems];

    case role.SENDER:
      return [...senderSidebarItems];

    default:
      return [];
  }
};
