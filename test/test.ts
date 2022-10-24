import { runPhases } from '../src'
const fetch = require('node-fetch')

const phases = [{
  duration: 10,
  arrivalRate: 1
},
{
  duration: 10,
  arrivalRate: 100
}]

let errorCount = 0

runPhases(phases, () => fetch('http://localhost:3000').catch(() => errorCount++))
.then((resultList) => {
  console.log('Error rate:', (errorCount / resultList.length * 100).toFixed(2) + '%')
})
