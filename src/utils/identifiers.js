export function generateId() {
  return Math.random().toString(36).substr(2, 6) +
         Date.now().toString(36);
}

export function uniqueName(prefix, immutableMap) {
  let i = 1;
  let name = prefix;
  while (immutableMap.has(name)) {
    name = name + (i++);
  }
  return name;
}
