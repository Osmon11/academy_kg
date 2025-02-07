import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      // Avoid hardcoded labels
      "react/jsx-no-literals": [
        // Be careful though that this doesn’t catch hardcoded attributes (e.g. aria-label="Open menu").
        "error",
        {
          noStrings: true, // Запрещает строки в JSX
          allowedStrings: ["|"], // Разрешённые символы
          ignoreProps: true, // Разрешает строковые литералы в props
        },
      ],
      // Consistently import navigation APIs from `@/shared/hooks/useAppRouter`
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message:
            "Please use hook useAppRouter from `@/shared/hooks/useAppRouter` instead.",
        },
        {
          name: "next-nprogress-bar",
          importNames: ["useRouter"],
          message:
            "Please import from `@/shared/hooks/useAppRouter` instead.",
        },
        {
          name: "next/navigation",
          importNames: ["useRouter"],
          message:
            "Please import from `@/shared/hooks/useAppRouter` instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "usePathname",
          ],
          message:
            "Please import from `@/i18n/routing` instead.",
        },
      ],
    },
  },
  {
    files: [
      "src/shared/hooks/useAppRouter.ts",
      "src/shared/UI/LocalizationMenu.tsx",
    ], // Exception files
    rules: {
      "no-restricted-imports": "off", // Disable the rule in these files
    },
  },
];

export default eslintConfig;
