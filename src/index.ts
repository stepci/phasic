export type Phase = {
  duration: number
  arrivalRate: number
}

export type PhaseFunction = {
  (): Promise<any>
}

function runPhase<T> (phase: Phase, func: PhaseFunction): Promise<PromiseSettledResult<T>[]> {
  return new Promise((resolve, reject) => {
    const phaseResults: Promise<T>[] = []
    const phaseTimer = setInterval(() => [...Array(phase.arrivalRate).keys()].forEach(() => phaseResults.push(func())), 1000)

    setTimeout(() => {
      clearInterval(phaseTimer)
      resolve(Promise.allSettled(phaseResults))
    }, (phase.duration * 1000) + 1000)
  })
}

export function runPhases<T> (phases: Phase[], func: PhaseFunction): Promise<PromiseSettledResult<T>[]> {
  return new Promise(async (resolve, reject) => {
    const results: PromiseSettledResult<T>[][] = []
    for (const phase of phases) {
      results.push(await runPhase<T>(phase, func))
    }

    resolve(results.flat())
  })
}
