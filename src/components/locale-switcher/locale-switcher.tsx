"use client";

import React, { useState, useTransition } from "react";
import { Select } from "../select/select";
import { AppLangShortcuts } from "@/helpers/constants/settings.contants";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";

function LocalSwitcher() {
  const routeLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [selectedLang, setSelectedLang] = useState(routeLocale);

  return (
    <Select
      placeholder="Select lang"
      defaultValue={routeLocale}
      value={selectedLang}
      onValueChange={(value) => {
        setSelectedLang(value);
        startTransition(() => {
          router.replace({ pathname }, { locale: value });
        });
      }}
      disabled={isPending}
      groups={[
        {
          items: AppLangShortcuts.map((lang) => ({
            content: lang,
            value: lang,
          })),
        },
      ]}
    />
  );
}

export default LocalSwitcher;
