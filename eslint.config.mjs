import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "react-hooks/immutability": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/display-name": "off",
      "no-redirected-imports": [
        "error",
        {
          name: "next/link",
          message: "Please import from `@navigation` instead",
          importNames: ["default"],
        },
        {
          name: "next/navigation",
          message: "Please import from `@navigation` instead",
          importNames: [
            "Link",
            "getPathname",
            "permanentRedirect",
            "redirect",
            "usePathname",
            "useRouter",
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
