export function generateId() {
  return Math.random().toString(36).substr(2, 6) +
         Date.now().toString(36);
}

export function generateName(prefix, immutableMap) {
  let i = 1;
  let name = prefix;
  while (immutableMap.has(name)) {
    name = prefix + (i++);
  }
  return name;
}
