import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (
  Component: ComponentType,
  requiredRoles?: TRole[] // now supports multiple roles
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data?.data;

    // If user is not logged in → redirect to login
    if (!isLoading && !user?.email) {
      return <Navigate to={"/login"} />;
    }

    // If roles are provided and user's role is not in the list → unauthorized
    if (
      requiredRoles &&
      !isLoading &&
      !requiredRoles.includes(user?.role as TRole)
    ) {
      return <Navigate to={"/unauthorized"} />;
    }

    // Otherwise → render component
    return <Component />;
  };
};
