import BigNumberJS from "bignumber.js";

export class BigNumber extends BigNumberJS {
  public static readonly ZERO: BigNumber = BigNumber.make(0);
  public static readonly ONE: BigNumber = BigNumber.make(1);
  public static readonly SATOSHI: BigNumber = BigNumber.make(1e8);

  public static make(value: BigNumberJS.Value, base?: number): BigNumber {
    return new BigNumber(value, base);
  }
}

BigNumberJS.config({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });

// Probably we have a better way to validate if is a address or a public key :P

const isWalletAddress = (value: string) => value.length === 34;

const isPublicKey = (value: string) => value.length === 66;

const readableCrypto = (
  value: string | undefined,
  appendCurrency: boolean = true,
  decimals: number = 8
) => {
  const locale = "en-US";
  if (value) {
    const bigNumberValue = BigNumber.make(value);
    const normalizedValue: string = Number(
      bigNumberValue.dividedBy(1e8)
    ).toLocaleString(locale, {
      maximumFractionDigits: decimals
    });

    return appendCurrency ? `${normalizedValue} Ѧ` : normalizedValue;
  }
};
export { isWalletAddress, isPublicKey, readableCrypto };
