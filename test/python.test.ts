import { expect } from "chai"
import { spawnProcess } from "./utils"

describe("Python", function () {
    this.timeout(600_000)

    describe("IPC: Runs test-ipc.py succesfully", function () {
        it("test-ipc.py exits with code 0", async function () {
            expect(await spawnProcess(
                'fireblocks-json-rpc',
                [
                    '--verbose',
                    '--',
                    'python',
                    'test/scripts/test-ipc.py',
                    '{}',
                ],
            )).to.be.equals(0)
        })
    })
    describe("HTTP: Runs test-http.py succesfully", function () {
        it("test-http.py exits with code 0", async function () {
            expect(await spawnProcess(
                'fireblocks-json-rpc',
                [
                    '--verbose',
                    '--http',
                    '--',
                    'python',
                    'test/scripts/test-http.py',
                    '{}',
                ],
            )).to.be.equals(0)
        })
    })
    describe("HTTP: Runs test-error.py succesfully", function () {
        it("test-error.py exits with code 0", async function () {
            expect(await spawnProcess(
                'fireblocks-json-rpc',
                [
                    '--verbose',
                    '--',
                    'python',
                    'test/scripts/test-error.py',
                ],
            )).to.be.equals(0)
        })
    })
    describe("HTTP: Runs test-contract.py succesfully", function () {
        it("test-contract.py exits with code 0", async function () {
            expect(await spawnProcess(
                'fireblocks-json-rpc',
                [
                    '--verbose',
                    '--',
                    'python',
                    'test/scripts/test-contract.py',
                ],
            )).to.be.equals(0)
        })
    })
})
