import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next.js 16부터 `next lint`가 제거되어 ESLint CLI(`npm run lint` → `eslint .`)로 실행한다.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // 연습/학습용 코드: 경고로만 표시 (MineMine 서비스 코드에는 적용하지 않음)
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
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".mastra/**"]),
]);

export default eslintConfig;
