const WorkerPlugin = require('worker-plugin');
export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: "node",   
    setupFiles: ["jest-canvas-mock"],
    plugins: [new WorkerPlugin()],
    globals: {
      window: {
        WebGLRenderingContext: {},
      },
    },
  
}
// import { LoginButton} from "@inrupt/solid-ui-react";
// import { encode } from "punycode";
// const { TextEncoder } = require('util')
// export default {
//     transform: {
//         "^.+\\.tsx?$": "ts-jest"
//     },  preset: "ts-jest/presets/js-with-ts",
//     //testEnvironment: "jsdom",
//     clearMocks: true,
//     collectCoverage: true,
//     coverageDirectory: "coverage",
//     coverageProvider: "v8",
//     testEnvironment: "node"
//     this
// }