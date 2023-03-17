"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
require("reflect-metadata");
const source_map_support_1 = __importDefault(require("source-map-support"));
const standalone_1 = require("@adonisjs/core/build/standalone");
const runner_1 = require("@japa/runner");
source_map_support_1.default.install({ handleUncaughtExceptions: false });
const kernel = new standalone_1.Ignitor(__dirname).kernel('test');
kernel
    .boot()
    .then(() => Promise.resolve().then(() => __importStar(require('./tests/bootstrap'))))
    .then(({ runnerHooks, ...config }) => {
    const app = [() => kernel.start()];
    (0, runner_1.configure)({
        ...kernel.application.rcFile.tests,
        ...(0, runner_1.processCliArgs)(process.argv.slice(2)),
        ...config,
        ...{
            importer: (filePath) => Promise.resolve().then(() => __importStar(require(filePath))),
            setup: app.concat(runnerHooks.setup),
            teardown: runnerHooks.teardown,
        },
        cwd: kernel.application.appRoot
    });
    (0, runner_1.run)();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQTtBQUU3Qiw0QkFBeUI7QUFDekIsNEVBQWlEO0FBQ2pELGdFQUF5RDtBQUN6RCx5Q0FBaUY7QUFFakYsNEJBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUU3RCxNQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRXBELE1BQU07S0FDSCxJQUFJLEVBQUU7S0FDTixJQUFJLENBQUMsR0FBRyxFQUFFLG1EQUFRLG1CQUFtQixHQUFDLENBQUM7S0FDdkMsSUFBSSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ25DLE1BQU0sR0FBRyxHQUF5QixDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBRXhELElBQUEsa0JBQVMsRUFBQztRQUNSLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSztRQUNsQyxHQUFHLElBQUEsdUJBQWMsRUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxHQUFHLE1BQU07UUFDVCxHQUFHO1lBQ0QsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsbURBQVEsUUFBUSxHQUFDO1lBQ3hDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDcEMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO1NBQy9CO1FBQ0QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTztLQUNoQyxDQUFDLENBQUE7SUFFRixJQUFBLFlBQUcsR0FBRSxDQUFBO0FBQ1AsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IFRlc3RzXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgVGhlIGNvbnRlbnRzIGluIHRoaXMgZmlsZSBib290cyB0aGUgQWRvbmlzSlMgYXBwbGljYXRpb24gYW5kIGNvbmZpZ3VyZXNcbnwgdGhlIEphcGEgdGVzdHMgcnVubmVyLlxufFxufCBGb3IgdGhlIG1vc3QgcGFydCB5b3Ugd2lsbCBuZXZlciBlZGl0IHRoaXMgZmlsZS4gVGhlIGNvbmZpZ3VyYXRpb25cbnwgZm9yIHRoZSB0ZXN0cyBjYW4gYmUgY29udHJvbGxlZCB2aWEgXCIuYWRvbmlzcmMuanNvblwiIGFuZFxufCBcInRlc3RzL2Jvb3RzdHJhcC50c1wiIGZpbGVzLlxufFxuKi9cblxucHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSAndGVzdCdcblxuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJ1xuaW1wb3J0IHNvdXJjZU1hcFN1cHBvcnQgZnJvbSAnc291cmNlLW1hcC1zdXBwb3J0J1xuaW1wb3J0IHsgSWduaXRvciB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2J1aWxkL3N0YW5kYWxvbmUnXG5pbXBvcnQgeyBjb25maWd1cmUsIHByb2Nlc3NDbGlBcmdzLCBydW4sIFJ1bm5lckhvb2tzSGFuZGxlciB9IGZyb20gJ0BqYXBhL3J1bm5lcidcblxuc291cmNlTWFwU3VwcG9ydC5pbnN0YWxsKHsgaGFuZGxlVW5jYXVnaHRFeGNlcHRpb25zOiBmYWxzZSB9KVxuXG5jb25zdCBrZXJuZWwgPSBuZXcgSWduaXRvcihfX2Rpcm5hbWUpLmtlcm5lbCgndGVzdCcpXG5cbmtlcm5lbFxuICAuYm9vdCgpXG4gIC50aGVuKCgpID0+IGltcG9ydCgnLi90ZXN0cy9ib290c3RyYXAnKSlcbiAgLnRoZW4oKHsgcnVubmVySG9va3MsIC4uLmNvbmZpZyB9KSA9PiB7XG4gICAgY29uc3QgYXBwOiBSdW5uZXJIb29rc0hhbmRsZXJbXSA9IFsoKSA9PiBrZXJuZWwuc3RhcnQoKV1cblxuICAgIGNvbmZpZ3VyZSh7XG4gICAgICAuLi5rZXJuZWwuYXBwbGljYXRpb24ucmNGaWxlLnRlc3RzLFxuICAgICAgLi4ucHJvY2Vzc0NsaUFyZ3MocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKSxcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIC4uLntcbiAgICAgICAgaW1wb3J0ZXI6IChmaWxlUGF0aCkgPT4gaW1wb3J0KGZpbGVQYXRoKSxcbiAgICAgICAgc2V0dXA6IGFwcC5jb25jYXQocnVubmVySG9va3Muc2V0dXApLFxuICAgICAgICB0ZWFyZG93bjogcnVubmVySG9va3MudGVhcmRvd24sXG4gICAgICB9LFxuICAgICAgY3dkOiBrZXJuZWwuYXBwbGljYXRpb24uYXBwUm9vdFxuICAgIH0pXG5cbiAgICBydW4oKVxuICB9KVxuIl19