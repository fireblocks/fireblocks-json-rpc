import { spawn } from 'child_process'

// Returns the exit code, or throws with the stderr 
// and stdout contents if the exit code is non-zero
export function spawnProcess(command: string, args: string[], logOutput = false) {
  return new Promise((resolve, reject) => {
    let stdoutContents = ''
    let stderrContents = ''

    const process = spawn(command, args, { stdio: 'pipe' })

    process.stdout.on('data', (data) => {
      logOutput && console.log(data.toString())
      stdoutContents += data.toString()
    })

    process.stderr.on('data', (data) => {
      logOutput && console.log(data.toString())
      stderrContents += data.toString()
    })

    function onError(code: any) {
      const cmd = `${command} ${args.join(' ')}`
      reject(new Error(`Command failed with exit code ${code}:
- subprocess stdout (${cmd}):
${stdoutContents}

- subprocess stderr (${cmd}):
${stderrContents}
`))
    }

    process.on('exit', (code) => {
      if (code === 0) {
        resolve(0)
      } else {
        onError(code)
      }
    })

    process.on('disconnect', () => {
      onError('{disconnected}')
    })
  })
}