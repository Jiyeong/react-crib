import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // 연습/학습용 코드: 빌드를 막지 않도록 경고로만 표시 (MineMine 서비스 코드에는 적용하지 않음)
    files: [
      "src/app/example/**",
      "src/app/lib/test.ts",
      "src/app/components/CommonModal.tsx",
      "src/app/components/DropDownMenu.tsx",
      "src/app/components/QRCode.tsx",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "warn",
    },
  },
];

export default eslintConfig;
