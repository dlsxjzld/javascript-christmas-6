export const MESSAGE = {
  EVENT_PLANNER_INSTRUCTION:
    '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n',
  ASK_VISIT_DATE:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ASK_MENU:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  EVENT_PLANNER_: (month, day) =>
    `${month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  ORDER_MENU: '<주문 메뉴>\n',
  BEFORE_DISCOUNT: '<할인 전 총주문 금액>\n',
  FREE_GIFT: '<증정 메뉴>\n',
  BENEFIT_DETAILS: '<혜택 내역>\n',
  TOTAL_DISCOUNT: '<총혜택 금액>\n',
  AFTER_DISCOUNT: '<할인 후 예상 결제 금액>\n',
  DECEMBER_BADGE: '<12월 이벤트 배지>\n',
};
