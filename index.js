const { exec } = require('./lib')

const opt = {
    func: `
    function main() {
        let a = 0, b = 1, c = 0
        for (let i = 0; i < 10; i++) {
            c = a + b
            a = b
            b = c
        }
        return c
    }`,
    framework: 'Benchmark.js',
    language: 'javascript'
}

exec({ ...opt, language: 'bash', exec: 'bash', bin: 'sh'}).then(() => {
    exec({ ...opt, exec: 'benchmark', bin: 'node'}).then(console.log).catch(console.error)
}).catch(console.error)

