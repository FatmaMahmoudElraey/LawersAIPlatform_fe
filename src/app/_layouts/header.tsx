"use client";

import { Select } from "@/components/select/select";
import { Avatar } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  AppLangEnum,
  AppThemeEnum,
} from "@/helpers/constants/settings.contants";
import {
  getShortcutNameAvatar,
  snakeToPascalCase,
} from "@/helpers/shared/stringOperations.helper";
import { cn } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

interface IHeader {
  routesToIgnore?: string[];
  toggleSidebar: () => void;
}

function Header({
  routesToIgnore,
  toggleSidebar: toggleShowingAppName,
}: IHeader) {
  const { setTheme: setNextTheme } = useTheme();

  const [lang, setLang] = useState<string>();
  const [theme, setTheme] = useState<string>();

  // useEffect(() => {
  //   if (lang || theme) {
  //     setSettings({
  //       ...(lang && { lang: lang as AppLang }),
  //       ...(theme && { theme: theme as AppTheme }),
  //     });
  //   }
  // }, [theme, lang]);

  const pathname = usePathname();
  const separatedFullPath = pathname.split("/");
  const paths: string[] = [];
  for (let i = 0; i < separatedFullPath.length; i++) {
    if (
      routesToIgnore &&
      routesToIgnore.length > 0 &&
      routesToIgnore?.includes(separatedFullPath[i])
    )
      continue;
    if (i === 0 || i === separatedFullPath.length - 1) continue;
    paths.push(separatedFullPath[i]);
  }

  const pascalCasePaths: string[] = [];
  paths.forEach(
    (path) =>
      !path.includes("id") &&
      isNaN(Number.parseInt(path)) &&
      pascalCasePaths.push(snakeToPascalCase(path))
  );

  return (
    <header
      className={cn(
        "py-3 px-4  bg-card flex flex-row justify-between rounded-bl-md rounded-br-md border-b-[2px] w-full"
      )}
    >
      <div
        className="flex flex-row gap-3 justify-start items-center"
        key="page_path_sidebar_trigger"
      >
        <SidebarTrigger onClick={toggleShowingAppName} key="sidebar_trigger" />

        <Breadcrumb key="breadcrumb">
          <BreadcrumbList>
            {pascalCasePaths.map(
              (path, i) =>
                path && (
                  <Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/${path.toLowerCase()}` as any}>
                          {path}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </Fragment>
                )
            )}

            {separatedFullPath[separatedFullPath.length - 1] && (
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {snakeToPascalCase(
                    separatedFullPath[separatedFullPath.length - 1]
                  )}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div
        className="flex flex-row gap-3 items-center"
        key="lang_theme_user_info"
      >
        <Select
          key="lang"
          onValueChange={(val) => setLang(val)}
          // setValue={setLang}
          value={lang}
          placeholder="Select Language"
          defaultValue={AppLangEnum.English.toString()}
          groups={[
            {
              items: Object.values(AppLangEnum).map((lang) => ({
                content: lang,
                value: lang.toString(),
              })),
            },
          ]}
        />
        <Select
          key="theme"
          // setValue={setTheme}
          onValueChange={(val) => {
            setTheme(val);
            setNextTheme(val);
          }}
          value={theme}
          placeholder="Select Theme"
          defaultValue={AppThemeEnum.Light.toString()}
          groups={[
            {
              items: Object.values(AppThemeEnum).map((theme) => ({
                content: theme,
                value: theme.toString(),
              })),
            },
          ]}
        />

        {/* <div className="rounded-full bg-gray-200 w-[40px] h-[40px] flex justify-center items-center">
          {userAuth.profileImage ? (
            <Image src={userAuth.profileImage} alt="profile_image" />
          ) : (
            <p className="font-bold text-blue-600">
              {getShortcutNameAvatar(userAuth.username)}
            </p>
          )}
        </div> */}
        {/* 
        <Avatar key="avatar" className="bg-gray-300">
          <AvatarImage src={userAuth.profileImage} alt="admin_image" />
          <AvatarFallback>
            {getShortcutNameAvatar(userAuth.username)}
          </AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
}

export default Header;
