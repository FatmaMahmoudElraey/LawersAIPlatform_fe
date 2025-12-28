import { createNavigation } from "next-intl/navigation";
import { AppLangShortcuts } from "./helpers/constants/settings.contants";
import { localePrefix, pathnames } from "./helpers/lang/lang.helper";

export const {
  Link,
  getPathname,
  permanentRedirect,
  redirect,
  usePathname,
  useRouter,
} = createNavigation({
  locales: AppLangShortcuts,
  pathnames,
  localePrefix,
});
