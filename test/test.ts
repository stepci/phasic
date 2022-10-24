import { runPhases } from '../src'
import fetch, { Response } from 'node-fetch'

const phases = [{
  duration: 10,
  arrivalRate: 1
},
{
  duration: 10,
  arrivalRate: 100
}]

let errorCount = 0

runPhases<Response>(phases, () => fetch('http://localhost:3000').catch(() => errorCount++))
.then((resultList) => {
  console.log('Status Codes:', resultList.map((result) => (result as PromiseFulfilledResult<Response>).value.status))
  console.log('Error rate:', (errorCount / resultList.length * 100).toFixed(2) + '%')
})
