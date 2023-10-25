type Type = { [key: string]: any }
// Function to exclude user password returned from prisma
function exclude<T extends Type>(object: T, keys: string[]) {
  for (let key of keys) {
    delete object[key]
  }
  return object
}

// Function tu include ...

export { exclude }
