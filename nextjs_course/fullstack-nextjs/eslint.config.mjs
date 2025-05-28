import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // ✅ Ignore paths
    {
        ignores: [
            "**/node_modules/**",
            "**/.next/**",
            "**/dist/**",
            "**/public/**",
            "**/build/**",
            "**/.vercel/**",
        ],
    },

    // ✅ Extend Next.js, TypeScript, and Prettier configs
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "plugin:prettier/recommended",
    ),

    // ✅ Custom rules
    {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "no-console": "warn",
            // Disable problematic rules
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-wrapper-object-types": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-this-alias": "off",
        },
    },
];

export default eslintConfig;
