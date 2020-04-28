const ENV = (process.env.NODE_ENV || "dev").toLowerCase()
const PROD = (ENV === "production" || ENV === "prod")

module.exports = {
  root         : true,
  env          : {
    es6 : true,
    jest: true,
    node: true,
  },
  extends      : [
    "airbnb-base",
    // Uses the recommended rules from the @typescript-eslint/eslint-plugins
    "plugin:@typescript-eslint/recommended"
  ],
  globals      : {
    Atomics          : "readonly",
    SharedArrayBuffer: "readonly"
  },
  settings     : {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType : "module"
  },
  rules        : {
    "@typescript-eslint/camelcase"            : 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-explicit-any"      : 0,
    "global-require"                          : 0,
    "import/extensions"                       : 0,
    "import/no-dynamic-require"               : 0,
    "no-debugger"                             : PROD ? 2 : 0,
    "key-spacing"                             : [
      "error", {
        "singleLine": {
          "beforeColon": false,
          "afterColon" : true
        },
        "multiLine" : {
          "beforeColon": true,
          "afterColon" : true,
          "align"      : "colon"
        }
      }
    ],
    "max-len"                                 : [
      "error", 120, 2, {
        ignoreComments: true,
        ignoreStrings : true,
        ignoreUrls    : true,
      },
    ],

  }
}