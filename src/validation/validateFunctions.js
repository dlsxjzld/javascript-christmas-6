import { Console } from '@woowacourse/mission-utils';
import { CONSTANT } from '../constants/constant.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => [
  toThrowNewError(input.include(' '), '공백은 안됩니다.'),
];

const isEmptyString = (input) => {
  toThrowNewError(input === '', '빈 문자열은 안됩니다.');
};

const isNumberType = (input) => {
  toThrowNewError(
    Number.isInteger(Number(input)) === false,
    '숫자만 가능합니다. NaN과 Infinity는 안됩니다.',
  );
};

const isPositiveNumber = (input) => {
  toThrowNewError(Number(input) > 0 === false, '양의 정수만 가능합니다.');
};

const isRangeOkay = (input) => {
  const number = Number(input);
  toThrowNewError(
    number < CONSTANT.MIN_VISIT_RANGE || number > CONSTANT.MAX_VISIT_RANGE,
    '1이상 31이하의 숫자만 가능합니다.',
  );
};

export const validateVisitDate = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  isNumberType(input);
  isPositiveNumber(input);
  isRangeOkay(input);
};
