"use client";

import type { Metadata } from "next";
import { redirect, useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar, {
  IAppSidebarCollapsedGroupItemsProps,
  IAppSidebarItemProps,
} from "@/components/sidebar/sidebar";
import Image from "next/image";
import {
  BookOpenCheck,
  LibraryBig,
  ListOrdered,
  MessageCircleQuestion,
  ShieldHalf,
  Users2,
} from "lucide-react";
import KhoshnawLogo from "@/assets/images/KHOSHN    AW_LOGO.png";
import { useEffect, useState } from "react";
import Header from "../_layouts/header";

// export const metadata: Metadata = {
//   title: 'Tech Examination',
//   description: 'Technician Examination Application',
// };

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hideAppName, setHideAppName] = useState<boolean>(false);
  const toggleSidebar = () => {
    setHideAppName(!hideAppName);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        header={
          <div className="pt-3 flex flex-col gap-2 justify-center items-center">
            <Image src={KhoshnawLogo} alt="Khoshnaw" width={100} height={100} />
            <p className="font-bold text-lg" hidden={hideAppName}>
              Technician Examination
            </p>
          </div>
        }
        content={{
          groups: [
            {
              label: "Application",
              items: [
                {
                  icon: <Users2 />,
                  path: "Employees",
                  tag: "employees",
                  title: "Employees",
                },

                {
                  icon: <MessageCircleQuestion />,
                  path: "Questions",
                  tag: "questions",
                  title: "Questions",
                },
              ] as IAppSidebarItemProps[],
            },
          ],
        }}
      />

      <div className="flex flex-col w-full">
        <Header key="header" toggleSidebar={toggleSidebar} />

        <main
          className="bg-sidebar lg:px-4 lg:py-4 md:px-4 md:py-4 sm:px-2 sm:py-2 w-full"
          key="main"
        >
          <SidebarInset>{children}</SidebarInset>
        </main>
      </div>
    </SidebarProvider>
  );
}
