const Environment = require('jest-environment-jsdom');
import {Worker as JestWorker} from 'jest-worker';
//import {prototype} from 'worker-plugin';
/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder } = require('util');
            this.global.TextEncoder = TextEncoder;
        }
        if (typeof this.global.TextDecoder === 'undefined') {
            const { TextDecoder } = require('util');
            this.global.TextDecoder = TextDecoder;
        }
        if (typeof this.global.performance.mark === 'undefined') {
            const { performance } = require('perf_hooks');
            this.global.performance.mark = performance.mark;
           
        }
        
        //const worker = new JestWorker();
        //this.global.Worker = worker;
    //     const {Worker } = require('worker-plugin');
    //    this.global.Worker =  Worker 


        
    }
}