import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("airbnb-base"), {
    plugins: {
        jest,
    },

    languageOptions: {
        globals: {
            ...jest.environments.globals.globals,
        },
    },

    rules: {
        "no-underscore-dangle": "off",
        "no-use-before-define": "off",
        "no-continue": "off",
        "no-restricted-syntax": ["off", "ForOfLoop"],
        "no-restricted-globals": ["off", "isNaN"],
    },
}];