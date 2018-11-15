import typescript from 'rollup-plugin-typescript'

export default {
    input: process.env.TARGET === 'main' ? 'src/main.ts' :'src/cact.ts',
    output: process.env.TARGET === 'main' ? {
        file: 'build/main.js',
        format: 'cjs'
    } :{
      file: 'build/cact.js',
      format: 'iife',
      name: 'cact'
    },
    plugins: [
        typescript()
    ]
  };