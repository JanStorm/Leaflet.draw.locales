import cleaner from "rollup-plugin-cleaner";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import progress from "rollup-plugin-progress";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import babel from '@rollup/plugin-babel';

export default {
  input: "src/index.ts",
  output: [
    {
      // Browser / ES6 output
      file: "./dist/leaflet.locales.js",
      format: "iife",
      exports: "named",
      sourcemap: true,
      name: "leafletLocales",
    },
  ],
  plugins: [
    cleaner({
      targets: [
        "./dist/",
      ],
    }),
    progress(),
    external(),
    resolve({browser: true}),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    babel({ // Transpile to ES5
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**'
    }),
    commonjs(),
    terser({
      ecma: 5,
    }),
    copy({
      targets: [
        { src: "examples/*", dest: "dist/examples" },
      ],
    }),
  ],
};
