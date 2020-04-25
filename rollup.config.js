import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ts from "@wessberg/rollup-plugin-ts";
import externals from "rollup-plugin-node-externals";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    { format: "cjs", file: packageJson.main },
    { format: "es", file: packageJson.module },
  ],
  external: externals(),
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    replace({
      "process.env.npm_package_name": JSON.stringify(packageJson.name),
      "process.env.npm_package_version": JSON.stringify(packageJson.version),
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    ts(),
    terser({
      mangle: {
        toplevel: true,
      },
    }),
  ],
};
