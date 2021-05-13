interface I_HashProvider {
  cripto(password: string): Promise<string>
  decode(password: string, hash: string): Promise<boolean>
}
export { I_HashProvider }