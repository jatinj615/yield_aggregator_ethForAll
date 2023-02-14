"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fontsource_roboto_300_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fontsource/roboto/300.css */ \"./node_modules/@fontsource/roboto/300.css\");\n/* harmony import */ var _fontsource_roboto_300_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_300_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fontsource_roboto_400_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fontsource/roboto/400.css */ \"./node_modules/@fontsource/roboto/400.css\");\n/* harmony import */ var _fontsource_roboto_400_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_400_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _fontsource_roboto_500_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fontsource/roboto/500.css */ \"./node_modules/@fontsource/roboto/500.css\");\n/* harmony import */ var _fontsource_roboto_500_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_500_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _fontsource_roboto_700_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fontsource/roboto/700.css */ \"./node_modules/@fontsource/roboto/700.css\");\n/* harmony import */ var _fontsource_roboto_700_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_700_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var styles_globals_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var styles_globals_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_globals_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! easy-peasy */ \"./node_modules/easy-peasy/dist/index.js\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @apollo/client */ \"./node_modules/@apollo/client/index.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\n/* harmony import */ var store_globalStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! store/globalStore */ \"./store/globalStore.ts\");\n/* harmony import */ var store_typedHooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! store/typedHooks */ \"./store/typedHooks.ts\");\n/* harmony import */ var _app_apollo_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app-apollo-client */ \"./lib/apollo-client.ts\");\n/* harmony import */ var _app_theme__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @app-theme */ \"./theme/theme.ts\");\n/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! utils */ \"./utils/index.ts\");\n/* harmony import */ var utils_showToast__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! utils/showToast */ \"./utils/showToast.ts\");\n/* harmony import */ var context_toastContext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! context/toastContext */ \"./context/toastContext.ts\");\n/* harmony import */ var constants_networkNames__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! constants/networkNames */ \"./constants/networkNames.ts\");\n/* harmony import */ var hooks_ethereum__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! hooks/ethereum */ \"./hooks/ethereum/index.ts\");\n/* harmony import */ var components_Structure_Structure__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! components/Structure/Structure */ \"./components/Structure/Structure.tsx\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\nfunction InnerUnrealApp(param) {\n    var Component = param.Component, pageProps = param.pageProps;\n    _s();\n    var mode = (0,store_typedHooks__WEBPACK_IMPORTED_MODULE_10__.useStoreState)(function(state) {\n        return state.theme.mode;\n    });\n    var setTheme = (0,store_globalStore__WEBPACK_IMPORTED_MODULE_9__.useStoreActions)(function(actions) {\n        return actions.setTheme;\n    });\n    var setToastData = (0,react__WEBPACK_IMPORTED_MODULE_6__.useContext)(context_toastContext__WEBPACK_IMPORTED_MODULE_15__.ToastContext).setToastData;\n    var library = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_8__.useWeb3React)().library;\n    var network = (0,hooks_ethereum__WEBPACK_IMPORTED_MODULE_17__.useNetwork)(library);\n    // Update the theme only if the mode changes\n    var theme = (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(function() {\n        return (0,_mui_material__WEBPACK_IMPORTED_MODULE_19__.createTheme)((0,_app_theme__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(mode));\n    }, [\n        mode\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function() {\n        if (network && !(network in constants_networkNames__WEBPACK_IMPORTED_MODULE_16__.SUPPORTED_NETWORKS)) {\n            (0,utils_showToast__WEBPACK_IMPORTED_MODULE_14__.showUnsupportedNetworkToast)(setToastData);\n            if (network === constants_networkNames__WEBPACK_IMPORTED_MODULE_16__.APP_REDIRECT_NETWORK) {\n                (0,utils_showToast__WEBPACK_IMPORTED_MODULE_14__.showRedirectNetworkToast)(setToastData);\n            }\n        }\n    }, [\n        network\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function() {\n        if ((0,utils__WEBPACK_IMPORTED_MODULE_13__.getItem)('theme')) {\n            setTheme((0,utils__WEBPACK_IMPORTED_MODULE_13__.getItem)('theme'));\n        }\n    }, [\n        setTheme\n    ]);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_19__.ThemeProvider, {\n        theme: theme,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(components_Structure_Structure__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n                fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n                lineNumber: 58,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n            lineNumber: 57,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n        lineNumber: 56,\n        columnNumber: 5\n    }, this));\n}\n_s(InnerUnrealApp, \"ZEJhmDOxGCeusL5m2hjvaj74888=\", false, function() {\n    return [\n        store_typedHooks__WEBPACK_IMPORTED_MODULE_10__.useStoreState,\n        store_globalStore__WEBPACK_IMPORTED_MODULE_9__.useStoreActions,\n        _web3_react_core__WEBPACK_IMPORTED_MODULE_8__.useWeb3React,\n        hooks_ethereum__WEBPACK_IMPORTED_MODULE_17__.useNetwork\n    ];\n});\n_c = InnerUnrealApp;\n// * initiate the store\nvar store = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_7__.createStore)(store_globalStore__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n// * this is the main setup file where all the top level library injections happen\nfunction UnrealApp(param) {\n    var Component = param.Component, pageProps = param.pageProps;\n    _s1();\n    // * initiate apollo\n    var apolloClient = (0,_app_apollo_client__WEBPACK_IMPORTED_MODULE_11__.useApollo)(pageProps);\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(), toastdata = ref[0], setToastData = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false), showConnectWalletModal = ref1[0], setShowConnectWalletModal = ref1[1];\n    var value = {\n        toastdata: toastdata,\n        setToastData: setToastData,\n        showConnectWalletModal: showConnectWalletModal,\n        setShowConnectWalletModal: setShowConnectWalletModal\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(easy_peasy__WEBPACK_IMPORTED_MODULE_7__.StoreProvider, {\n        store: store,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_web3_react_core__WEBPACK_IMPORTED_MODULE_8__.Web3ReactProvider, {\n            getLibrary: utils__WEBPACK_IMPORTED_MODULE_13__.getEthereumProviderLibrary,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(context_toastContext__WEBPACK_IMPORTED_MODULE_15__.ToastContext.Provider, {\n                value: value,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_apollo_client__WEBPACK_IMPORTED_MODULE_20__.ApolloProvider, {\n                    client: apolloClient,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InnerUnrealApp, _objectSpread({\n                        Component: Component\n                    }, pageProps), void 0, false, {\n                        fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n                    lineNumber: 79,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n                lineNumber: 78,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n            lineNumber: 77,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/jatinjain/Documents/hackathon/ethforall/frontend/pages/_app.tsx\",\n        lineNumber: 76,\n        columnNumber: 5\n    }, this));\n}\n_s1(UnrealApp, \"iOoQAUSkSLzkYdOacYuUuBxSOkk=\", false, function() {\n    return [\n        _app_apollo_client__WEBPACK_IMPORTED_MODULE_11__.useApollo\n    ];\n});\n_c1 = UnrealApp;\n/* harmony default export */ __webpack_exports__[\"default\"] = (UnrealApp);\nvar _c, _c1;\n$RefreshReg$(_c, \"InnerUnrealApp\");\n$RefreshReg$(_c1, \"UnrealApp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxJQUF3QixLQUFyRHNDLHlCQUF5QixHQUFJdEMsSUFBd0I7SUFDcEYsR0FBSyxDQUFDdUMsS0FBSyxHQUFHLENBQUM7UUFBQ0gsU0FBUyxFQUFUQSxTQUFTO1FBQUVOLFlBQVksRUFBWkEsWUFBWTtRQUFFTyxzQkFBc0IsRUFBdEJBLHNCQUFzQjtRQUFFQyx5QkFBeUIsRUFBekJBLHlCQUF5QjtJQUFDLENBQUM7SUFFNUYsTUFBTSw2RUFDSHBDLHFEQUFhO1FBQUMrQixLQUFLLEVBQUVBLEtBQUs7OEZBQ3hCMUIsK0RBQWlCO1lBQUNpQyxVQUFVLEVBQUUzQiw4REFBMEI7a0dBQ3RESSx3RUFBcUI7Z0JBQUNzQixLQUFLLEVBQUVBLEtBQUs7c0dBQ2hDcEMsMkRBQWM7b0JBQUN1QyxNQUFNLEVBQUVQLFlBQVk7MEdBQ2pDYixjQUFjO3dCQUFDQyxTQUFTLEVBQUVBLFNBQVM7dUJBQU1DLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNL0QsQ0FBQztJQWxCUVUsU0FBUzs7UUFFS3ZCLDBEQUFTOzs7TUFGdkJ1QixTQUFTO0FBb0JsQiwrREFBZUEsU0FBUyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAZm9udHNvdXJjZS9yb2JvdG8vMzAwLmNzcyc7XG5pbXBvcnQgJ0Bmb250c291cmNlL3JvYm90by80MDAuY3NzJztcbmltcG9ydCAnQGZvbnRzb3VyY2Uvcm9ib3RvLzUwMC5jc3MnO1xuaW1wb3J0ICdAZm9udHNvdXJjZS9yb2JvdG8vNzAwLmNzcyc7XG5cbmltcG9ydCAnc3R5bGVzL2dsb2JhbHMuY3NzJztcblxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgU3RvcmVQcm92aWRlciB9IGZyb20gJ2Vhc3ktcGVhc3knO1xuaW1wb3J0IHsgQXBvbGxvUHJvdmlkZXIgfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XG5pbXBvcnQgeyBjcmVhdGVUaGVtZSwgVGhlbWVQcm92aWRlciB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgdXNlV2ViM1JlYWN0LCBXZWIzUmVhY3RQcm92aWRlciB9IGZyb20gJ0B3ZWIzLXJlYWN0L2NvcmUnO1xuaW1wb3J0IHsgV2ViM1Byb3ZpZGVyIH0gZnJvbSAnQGV0aGVyc3Byb2plY3QvcHJvdmlkZXJzJztcblxuaW1wb3J0IGdsb2JhbFN0b3JlLCB7IHVzZVN0b3JlQWN0aW9ucyB9IGZyb20gJ3N0b3JlL2dsb2JhbFN0b3JlJztcbmltcG9ydCB7IFN0b3JlTW9kZWwgfSBmcm9tICdzdG9yZS9tb2RlbCc7XG5pbXBvcnQgeyB1c2VTdG9yZVN0YXRlIH0gZnJvbSAnc3RvcmUvdHlwZWRIb29rcyc7XG5pbXBvcnQgeyB1c2VBcG9sbG8gfSBmcm9tICdAYXBwLWFwb2xsby1jbGllbnQnO1xuaW1wb3J0IGdldERlc2lnblRva2VucyBmcm9tICdAYXBwLXRoZW1lJztcbmltcG9ydCB7IGdldEV0aGVyZXVtUHJvdmlkZXJMaWJyYXJ5LCBnZXRJdGVtIH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgc2hvd1JlZGlyZWN0TmV0d29ya1RvYXN0LCBzaG93VW5zdXBwb3J0ZWROZXR3b3JrVG9hc3QgfSBmcm9tICd1dGlscy9zaG93VG9hc3QnO1xuaW1wb3J0IHsgVG9hc3RDb250ZXh0IH0gZnJvbSAnY29udGV4dC90b2FzdENvbnRleHQnO1xuaW1wb3J0IHsgQVBQX1JFRElSRUNUX05FVFdPUkssIFNVUFBPUlRFRF9ORVRXT1JLUyB9IGZyb20gJ2NvbnN0YW50cy9uZXR3b3JrTmFtZXMnO1xuaW1wb3J0IHsgdXNlTmV0d29yayB9IGZyb20gJ2hvb2tzL2V0aGVyZXVtJztcblxuaW1wb3J0IFN0cnVjdHVyZUNvbXBvbmVudCBmcm9tICdjb21wb25lbnRzL1N0cnVjdHVyZS9TdHJ1Y3R1cmUnO1xuXG5mdW5jdGlvbiBJbm5lclVucmVhbEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIGNvbnN0IG1vZGUgPSB1c2VTdG9yZVN0YXRlKChzdGF0ZSkgPT4gc3RhdGUudGhlbWUubW9kZSk7XG4gIGNvbnN0IHNldFRoZW1lID0gdXNlU3RvcmVBY3Rpb25zKChhY3Rpb25zKSA9PiBhY3Rpb25zLnNldFRoZW1lKTtcbiAgY29uc3QgeyBzZXRUb2FzdERhdGEgfSA9IHVzZUNvbnRleHQoVG9hc3RDb250ZXh0KTtcbiAgY29uc3QgeyBsaWJyYXJ5IH0gPSB1c2VXZWIzUmVhY3Q8V2ViM1Byb3ZpZGVyPigpO1xuICBjb25zdCBuZXR3b3JrID0gdXNlTmV0d29yayhsaWJyYXJ5KTtcblxuICAvLyBVcGRhdGUgdGhlIHRoZW1lIG9ubHkgaWYgdGhlIG1vZGUgY2hhbmdlc1xuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCkgPT4gY3JlYXRlVGhlbWUoZ2V0RGVzaWduVG9rZW5zKG1vZGUpKSwgW21vZGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChuZXR3b3JrICYmICEobmV0d29yayBpbiBTVVBQT1JURURfTkVUV09SS1MpKSB7XG4gICAgICBzaG93VW5zdXBwb3J0ZWROZXR3b3JrVG9hc3Qoc2V0VG9hc3REYXRhKTtcbiAgICAgIGlmIChuZXR3b3JrID09PSBBUFBfUkVESVJFQ1RfTkVUV09SSykge1xuICAgICAgICBzaG93UmVkaXJlY3ROZXR3b3JrVG9hc3Qoc2V0VG9hc3REYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtuZXR3b3JrXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZ2V0SXRlbSgndGhlbWUnKSkge1xuICAgICAgc2V0VGhlbWUoZ2V0SXRlbSgndGhlbWUnKSk7XG4gICAgfVxuICB9LCBbc2V0VGhlbWVdKTtcblxuICByZXR1cm4gKFxuICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICA8U3RydWN0dXJlQ29tcG9uZW50PlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8L1N0cnVjdHVyZUNvbXBvbmVudD5cbiAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICk7XG59XG5cbi8vICogaW5pdGlhdGUgdGhlIHN0b3JlXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlPFN0b3JlTW9kZWw+KGdsb2JhbFN0b3JlKTtcblxuLy8gKiB0aGlzIGlzIHRoZSBtYWluIHNldHVwIGZpbGUgd2hlcmUgYWxsIHRoZSB0b3AgbGV2ZWwgbGlicmFyeSBpbmplY3Rpb25zIGhhcHBlblxuZnVuY3Rpb24gVW5yZWFsQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgLy8gKiBpbml0aWF0ZSBhcG9sbG9cbiAgY29uc3QgYXBvbGxvQ2xpZW50ID0gdXNlQXBvbGxvKHBhZ2VQcm9wcyk7XG4gIGNvbnN0IFt0b2FzdGRhdGEsIHNldFRvYXN0RGF0YV0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbc2hvd0Nvbm5lY3RXYWxsZXRNb2RhbCwgc2V0U2hvd0Nvbm5lY3RXYWxsZXRNb2RhbF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IHZhbHVlID0geyB0b2FzdGRhdGEsIHNldFRvYXN0RGF0YSwgc2hvd0Nvbm5lY3RXYWxsZXRNb2RhbCwgc2V0U2hvd0Nvbm5lY3RXYWxsZXRNb2RhbCB9O1xuXG4gIHJldHVybiAoXG4gICAgPFN0b3JlUHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxXZWIzUmVhY3RQcm92aWRlciBnZXRMaWJyYXJ5PXtnZXRFdGhlcmV1bVByb3ZpZGVyTGlicmFyeX0+XG4gICAgICAgIDxUb2FzdENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT5cbiAgICAgICAgICA8QXBvbGxvUHJvdmlkZXIgY2xpZW50PXthcG9sbG9DbGllbnR9PlxuICAgICAgICAgICAgPElubmVyVW5yZWFsQXBwIENvbXBvbmVudD17Q29tcG9uZW50fSB7Li4ucGFnZVByb3BzfT48L0lubmVyVW5yZWFsQXBwPlxuICAgICAgICAgIDwvQXBvbGxvUHJvdmlkZXI+XG4gICAgICAgIDwvVG9hc3RDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgPC9XZWIzUmVhY3RQcm92aWRlcj5cbiAgICA8L1N0b3JlUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVucmVhbEFwcDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlU3RhdGUiLCJjcmVhdGVTdG9yZSIsIlN0b3JlUHJvdmlkZXIiLCJBcG9sbG9Qcm92aWRlciIsImNyZWF0ZVRoZW1lIiwiVGhlbWVQcm92aWRlciIsInVzZVdlYjNSZWFjdCIsIldlYjNSZWFjdFByb3ZpZGVyIiwiZ2xvYmFsU3RvcmUiLCJ1c2VTdG9yZUFjdGlvbnMiLCJ1c2VTdG9yZVN0YXRlIiwidXNlQXBvbGxvIiwiZ2V0RGVzaWduVG9rZW5zIiwiZ2V0RXRoZXJldW1Qcm92aWRlckxpYnJhcnkiLCJnZXRJdGVtIiwic2hvd1JlZGlyZWN0TmV0d29ya1RvYXN0Iiwic2hvd1Vuc3VwcG9ydGVkTmV0d29ya1RvYXN0IiwiVG9hc3RDb250ZXh0IiwiQVBQX1JFRElSRUNUX05FVFdPUksiLCJTVVBQT1JURURfTkVUV09SS1MiLCJ1c2VOZXR3b3JrIiwiU3RydWN0dXJlQ29tcG9uZW50IiwiSW5uZXJVbnJlYWxBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJtb2RlIiwic3RhdGUiLCJ0aGVtZSIsInNldFRoZW1lIiwiYWN0aW9ucyIsInNldFRvYXN0RGF0YSIsImxpYnJhcnkiLCJuZXR3b3JrIiwic3RvcmUiLCJVbnJlYWxBcHAiLCJhcG9sbG9DbGllbnQiLCJ0b2FzdGRhdGEiLCJzaG93Q29ubmVjdFdhbGxldE1vZGFsIiwic2V0U2hvd0Nvbm5lY3RXYWxsZXRNb2RhbCIsInZhbHVlIiwiZ2V0TGlicmFyeSIsIlByb3ZpZGVyIiwiY2xpZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ })

});