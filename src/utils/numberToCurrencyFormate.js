import BN from 'bignumber.js';
const _BN = BN.clone();
_BN.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
  },
});

export default function numberToCurrencyFormat(
  number = '0',
  needDecimalPoint = true,
) {
  if (needDecimalPoint) {
    let tmpStr = new _BN(number).toFormat(5);

    if (Number(number) > 0 && tmpStr === '0.00000') {
      tmpStr = '< 0.00001';
    }

    return tmpStr;
  }

  return new _BN(number).toFormat(0);
}

window.n2cf = numberToCurrencyFormat;
