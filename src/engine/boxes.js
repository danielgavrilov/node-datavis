export function box(source, value) {
  return {
    source,
    value
  }
}

export function unbox({ value }) {
  return value;
}
