# AI Benchmark Generator

AI Benchmark Generator is a Node.js library that generates optimized benchmark code for functions in various programming languages using AI. It leverages OpenAI's GPT-3.5-turbo model to create performance improvements and benchmark tests for user-provided functions. The generated benchmarks are then executed to determine the most efficient implementation.

## Features

- Supports multiple programming languages.
- Uses AI to generate optimized versions of the input function.
- Creates benchmark tests for each optimized version.
- Executes benchmarks and provides performance results.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/italojs/bench-ai.git
   cd bench-ai
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up your OpenAI API key:
   ```sh
   export OPENAPI_KEY='your_openai_api_key'
   ```

## Usage

1. Define your function and benchmark options in `index.js`:
   ```javascript
   const { exec } = require('./lib');

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
   };

   exec({ ...opt, language: 'bash', exec: 'bash', bin: 'sh'}).then(() => {
       exec({ ...opt, exec: 'benchmark', bin: 'node'}).then(console.log).catch(console.error);
   }).catch(console.error);
   ```

2. Run the script:
   ```sh
   node index.js
   ```

## Configuration

- `func`: The function you want to benchmark, provided as a string.
- `framework`: The benchmark framework to use (e.g., Benchmark.js).
- `language`: The programming language of the function.

## Example

Here is an example of how to use the library to benchmark a JavaScript function:

1. Modify `index.js`:
   ```javascript
   const { exec } = require('./lib');

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
   };

   exec({ ...opt, language: 'bash', exec: 'bash', bin: 'sh'}).then(() => {
       exec({ ...opt, exec: 'benchmark', bin: 'node'}).then(console.log).catch(console.error);
   }).catch(console.error);
   ```

2. Run the script:
   ```sh
   node index.js
   ```

## Supported Languages

The library supports a wide range of programming languages as defined in `extensions.json`. Some of the supported languages include:

- JavaScript
- Python
- Java
- C
- C++
- C#
- Ruby
- PHP
- Swift
- Kotlin
- Go
- Rust
- TypeScript

For a complete list, refer to the `extensions.json` file.

# Next features
- support input/output example
- Integration with [instant-bench-agent](https://github.com/Instant-Bench/instant-bench-agent)
- Plugin for neovim and vscode

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgements

This project uses the following libraries and services:

- [LangChain](https://github.com/hwchase17/langchain)
- [OpenAI](https://openai.com/)
- [Benchmark.js](https://benchmarkjs.com/)

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/italojs/bench-ai).

