"use client";

import { GetCurrentUserFromDB } from "@/actions/user";
import AppHeader from "@/components/Header";
import Loader from "@/components/Loader";
import { ADMIN_MENU, USER_MENU } from "@/lib/route-options";
import { User } from "@prisma/client";
import { message } from "antd";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuOptions, setMenuOptions] = useState(USER_MENU);

  const pathName = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathName.split("/")[1]);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const res: any = await GetCurrentUserFromDB();
      if (res.error) throw new Error(res.error.message);
      setCurrentUser(res.data);
      if (res.data.isAdmin) {
        setMenuOptions(ADMIN_MENU);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, [isPublicRoute]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isPublicRoute && (
            <AppHeader currentUser={currentUser} menuOptions={menuOptions} />
          )}
          <div className="py-2 sm:px-10 px-6 container mx-auto">{children}</div>
        </>
      )}
    </>
  );
};

export default LayoutProvider;
