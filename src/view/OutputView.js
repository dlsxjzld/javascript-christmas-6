import { Console } from '@woowacourse/mission-utils';

export const OutputView = {
  printMenu() {
    Console.print('<주문 메뉴>');
  },

  printResult(result) {
    Console.print(result);
  },
};
