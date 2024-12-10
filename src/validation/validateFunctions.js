import { Console } from '@woowacourse/mission-utils';
import { CONSTANT } from '../constants/constant.js';
import { MENU_KIND, MENU_PRICE, DRINK } from '../constants/menu.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => [
  toThrowNewError(
    input.includes(' '),
    '유효하지 않은 날짜입니다. 다시 입력해 주세요. 공백은 안됩니다.',
  ),
];

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    '유효하지 않은 날짜입니다. 다시 입력해 주세요. 빈 문자열은 안됩니다.',
  );
};

const isNumberType = (input) => {
  toThrowNewError(
    Number.isInteger(Number(input)) === false,
    '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  );
};

const isDateRangeOkay = (input) => {
  const number = Number(input);
  toThrowNewError(
    number < CONSTANT.MIN_VISIT_RANGE || number > CONSTANT.MAX_VISIT_RANGE,
    '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  );
};

export const validateVisitDate = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  isNumberType(input);
  isDateRangeOkay(input);
};

const isOrderCountRight = (input) => {
  const orderCount = input.split(',').filter(Boolean).length;
  const commaCount = input.split('').filter((char) => char === ',').length;
  toThrowNewError(
    orderCount - 1 !== commaCount,
    '유효하지 않은 주문입니다. 다시 입력해 주세요. ,는 주문과 주문 사이에 1개만 존재해야 합니다.',
  );
};

const hasNoMenu = (input) => {
  const [menu] = input.split('-');
  return MENU_PRICE[menu] === undefined;
};
const hasAllMenu = (input) => {
  const orders = input.split(',');
  toThrowNewError(
    orders.some((order) => hasNoMenu(order)),
    '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  );
};

const isDrink = (input) => {
  const [menu] = input.split('-');
  const kind = MENU_KIND[menu];

  return kind === DRINK;
};

const isAllMenuDrink = (input) => {
  const orders = input.split(',');
  toThrowNewError(
    orders.every((order) => isDrink(order)),
    '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  );
};

const isQuantityRight = (input) => {
  const orders = input.split(',').map((order) => {
    const [menu, quantity] = order.split('-');
    return [menu, Number(quantity)];
  });
  const totalCount = orders.reduce((acc, cur) => acc + cur[1], 0);
  toThrowNewError(
    totalCount > CONSTANT.MAX_QUANTITY_RANGE,
    '유효하지 않은 주문입니다. 다시 입력해 주세요. 개수 총합이 20을 초과하면 안됩니다.',
  );
};

const isQuantityRangeOkay = (input) => {
  const orders = input.split(',').map((order) => {
    const [menu, quantity] = order.split('-');
    return [menu, Number(quantity)];
  });
  toThrowNewError(
    orders.some(
      (order) =>
        order[1] < CONSTANT.MIN_QUANTITY_RANGE ||
        order[1] > CONSTANT.MAX_QUANTITY_RANGE,
    ),
    '유효하지 않은 주문입니다. 다시 입력해 주세요. 1이상 20이하만 입력 가능합니다.',
  );
};
const isQuantityInteger = (input) => {
  const orders = input.split(',').map((order) => {
    const [menu, quantity] = order.split('-');
    if (quantity === '') {
      return [menu, NaN];
    }
    return [menu, Number(quantity)];
  });
  toThrowNewError(
    orders.some((order) => Number.isInteger(order[1]) === false),
    '유효하지 않은 주문입니다. 다시 입력해 주세요. 개수는 양의 정수만 가능합니다.',
  );
};

const hasDuplicateMenu = (input) => {
  const orders = input.split(',').map((order) => {
    const [menu, quantity] = order.split('-');
    return [menu, Number(quantity)];
  });
  const countOfOrders = new Set(orders.map(([order]) => order)).size;
  toThrowNewError(
    orders.length !== countOfOrders,
    '유효하지 않은 주문입니다. 다시 입력해 주세요. 중복 메뉴는 안됩니다.',
  );
};

export const validateMenuAndQuantity = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  isOrderCountRight(input);
  hasAllMenu(input);
  hasDuplicateMenu(input);
  isAllMenuDrink(input);
  isQuantityInteger(input);
  isQuantityRangeOkay(input);
  isQuantityRight(input);
};
