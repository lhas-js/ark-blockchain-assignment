// Probably we have a better way to validate if is a address or a public key :P

const isWalletAddress = (value: string) => value.length === 34;

const isPublicKey = (value: string) => value.length === 66;

export { isWalletAddress, isPublicKey };
