"use client";

import { UserButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { Button, Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: User | null;
  menuOptions: {
    name: string;
    path: string;
  }[];
}

const AppHeader = ({ currentUser, menuOptions }: Props) => {
  const router = useRouter();

  return (
    <header className="bg-[#121533] py-2  ">
      <div className="flex items-center justify-between container mx-auto sm:px-10 px-6">
        <Link href="/" className="no-underline">
          <h3 className="text-white ">NextProperties</h3>
        </Link>
        <div className="flex items-center space-x-3">
          {menuOptions && (
            <Dropdown
              menu={{
                items: menuOptions.map((item) => ({
                  label: item.name,
                  onClick: () => {
                    router.push(item.path);
                  },
                })) as any,
              }}
              placement="bottomLeft"
            >
              <Button>{currentUser?.username}</Button>
            </Dropdown>
          )}

          {currentUser && <UserButton afterSignOutUrl="/sign-in" />}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
