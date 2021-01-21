//Strip behavior definitions out of agentConstants when we serialize them with JSON
//to prevent circular loops.

function replacer(key, value) {
  if (key === 'behavior' || key === 'instructor' || key==='currentPatient')
    return undefined;
  return value;
}

export default replacer;