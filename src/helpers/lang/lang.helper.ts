import { Pathnames, LocalePrefix } from "next-intl/routing";
import {
  AppLangShortcut,
  AppLangShortcuts,
} from "../constants/settings.contants";

export const pathnames: Pathnames<typeof AppLangShortcuts> = {
  "/": "/",
  "/pathnames": "/pathnames",
};

export const localePrefix: LocalePrefix<typeof AppLangShortcuts> = "always";
