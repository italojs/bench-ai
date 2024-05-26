const { ChatOpenAI } = require('@langchain/openai')
const { spawn } = require('child_process')
const fs = require('fs')
const languages = require('./extensions.json')

function configModel() {
    return new ChatOpenAI({
        streaming: true,
        maxRetries: 10,
        maxConcurrency: 5,
        temperature: 0,
        openAIApiKey: process.env.OPENAPI_KEY,
        model: 'gpt-3.5-turbo-16k',
    })
}

function parser(str, language) {
    const regex = new RegExp(`\`\`\`${language}\\n([\\s\\S]*?)\`\`\``);
    const match = str.match(regex);
    return match ? match[1] : null;
}

function run (bin, file) {
    return new Promise((resolve, reject) => {
        const cmd = spawn(bin, [file])
        
        const logCmd = (data) => console.log(data.toString())
        cmd.stdout.on('data', logCmd)
        cmd.stderr.on('data', logCmd)

        const returnCmd = (code) => code !== 0 ? reject(code) : resolve(code)
        cmd.on('close', returnCmd);
        cmd.on('exit', returnCmd);
    })
}

const prompts = {
    benchmark: ({func, framework, language}) =>
        `
        I want to check the most performant way to execute my function.
        I will give you a ${language} function, and you must:
        - Create some variations of the function implementation with performance improvements (e.g., using different algorithms, optimizing loops, minimizing memory usage).
        - Create a benchmark test for each variation using the ${framework} framework.
    
        The output should include:
        1. The original function.
        2. Several variations of the function with performance improvements.
        3. Benchmark tests for each function variation using ${framework}.
    
        Provide the complete code in the script in markdown format. The code must be complete and working, as I will run your output on my local machine to see if it works.
        Do not explain the code, just provide the script.

        input function:
        ${func}`,
    bash: ({ language, framework }) => `
    I want to run a benchmark wrote in ${language} using ${framework}.
    Give me a bash shell script to initiate the project, install the dependencies and run the benchmark.
    Provide the complete code in the script in markdown format. The code must be complete and working, as I will run your output on my local machine to see if it works.
    Do not explain the code, just provide the script.
    Do not create folders, just use the current directory.
    Just install the dependencies needed to run the benchmark, do not create or execute the benchmark itself.
    `
}

async function exec(opt) {
    const model = configModel() 
    const { exec, language } = opt

    const prompt = prompts[exec](opt);
    const { content } = await model.invoke(prompt);
    const code = parser(content, language);

    const fileName = `./bench.${languages[language]}`
    fs.writeFileSync(fileName, code)
    return run(opt.bin, fileName)
}

module.exports = {
    exec
}