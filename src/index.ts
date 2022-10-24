export type Phase = {
  duration: number
  arrivalRate: number
}

export type PhaseFunction = {
  (): Promise<any>
}

function runPhase (phase: Phase, func: PhaseFunction) {
  return new Promise((resolve, reject) => {
    const phaseResults: PromiseSettledResult<any>[] = []
    const phaseTimer = setInterval(() => [...Array(phase.arrivalRate).keys()].forEach(async () => phaseResults.push(await func())), 1000)

    setTimeout(() => {
      clearInterval(phaseTimer)
      resolve(Promise.allSettled(phaseResults))
    }, (phase.duration * 1000) + 1000)
  })
}

export function runPhases (phases: Phase[], func: PhaseFunction): Promise<PromiseSettledResult<any>[]> {
  return new Promise(async (resolve, reject) => {
    const results = []
    for (const phase of phases) {
      results.push(await runPhase(phase, func))
    }

    resolve(results.flat() as PromiseSettledResult<any>[])
  })
}
