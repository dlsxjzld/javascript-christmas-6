import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { MESSAGE } from './constants/message.js';
import {
  validateMenuAndQuantity,
  validateVisitDate,
} from './validation/validateFunctions.js';
import EventPlanner from './model/EventPlanner.js';

class App {
  async run() {
    OutputView.printResult(MESSAGE.EVENT_PLANNER_INSTRUCTION);
    const visitDate = await this.getVisitDate();
    const menuAndQuantity = await this.getMenuAndQuantity();

    const eventPlanner = new EventPlanner(visitDate, menuAndQuantity);
    this.printEvent(eventPlanner, visitDate);
  }

  async getVisitDate() {
    try {
      const input = await InputView.readUserInput(MESSAGE.ASK_VISIT_DATE);
      validateVisitDate(input);
      return input;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getVisitDate();
    }
  }

  async getMenuAndQuantity() {
    try {
      const input = await InputView.readUserInput(MESSAGE.ASK_MENU);

      validateMenuAndQuantity(input);
      return input;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getMenuAndQuantity();
    }
  }

  printEvent(eventPlanner, visitDate) {
    OutputView.printResult(MESSAGE.EVENT_PLANNER(12, visitDate));
    eventPlanner.start();
    this.printAllMenu(eventPlanner);
    const totalPrice = this.printTotalPrice(eventPlanner);
    const freeDiscount = this.printFreeGift(eventPlanner);
    const totalDiscount = this.printBenefitDetails(eventPlanner);
    this.printTotalDiscount(totalDiscount);
    this.printAfterDiscount(totalPrice - totalDiscount + freeDiscount);
    this.printBadge(totalDiscount, eventPlanner);
  }

  printAllMenu(eventPlanner) {
    OutputView.printResult(MESSAGE.ORDER_MENU);
    eventPlanner
      .getAllOrders()
      .forEach(([menu, quantity]) =>
        OutputView.printResult(`${menu} ${quantity}개`),
      );
    OutputView.printResult('');
  }

  printTotalPrice(eventPlanner) {
    OutputView.printResult(MESSAGE.BEFORE_DISCOUNT);
    OutputView.printResult(
      `${eventPlanner.getTotalPrice().toLocaleString()}원`,
    );
    OutputView.printResult('');
    return eventPlanner.getTotalPrice();
  }

  printFreeGift(eventPlanner) {
    OutputView.printResult(MESSAGE.FREE_GIFT);
    if (!eventPlanner.getCanEvent()) {
      OutputView.printResult('없음');
      OutputView.printResult('');
      return 0;
    }
    const { menu, quantity, price } = eventPlanner.getFreeGift();
    OutputView.printResult(`${menu} ${quantity}개`);
    OutputView.printResult('');
    return price;
  }

  getAllDiscount(eventPlanner) {
    return {
      christmasDiscount: eventPlanner.getChristmasDDayDiscount(),
      dayDiscount: eventPlanner.getKindOfDayDiscount(),
      starDiscount: eventPlanner.getStarDiscount(),
      freeGift: eventPlanner.getFreeGift(),
    };
  }

  printBenefitDetails(eventPlanner) {
    OutputView.printResult(MESSAGE.BENEFIT_DETAILS);
    if (!eventPlanner.getCanEvent()) {
      OutputView.printResult('없음');
      OutputView.printResult('');
      return 0;
    }
    const { christmasDiscount, dayDiscount, starDiscount, freeGift } =
      this.getAllDiscount(eventPlanner);

    OutputView.printResult(
      `크리스마스 디데이 할인: -${christmasDiscount.toLocaleString()}원`,
    );
    OutputView.printResult(
      `${eventPlanner.getKindOfDay()} 할인: -${dayDiscount.toLocaleString()}원`,
    );
    OutputView.printResult(`특별 할인: -${starDiscount.toLocaleString()}원`);
    OutputView.printResult(
      `증정 이벤트: -${freeGift.price.toLocaleString()}원`,
    );
    OutputView.printResult('');

    return christmasDiscount + dayDiscount + starDiscount + freeGift.price;
  }

  printTotalDiscount(totalDiscount) {
    OutputView.printResult(MESSAGE.TOTAL_DISCOUNT);
    if (totalDiscount === 0) {
      OutputView.printResult(`0원`);
      OutputView.printResult('');
      return;
    }
    OutputView.printResult(`-${totalDiscount.toLocaleString()}원`);
    OutputView.printResult('');
  }

  printAfterDiscount(afterDiscount) {
    OutputView.printResult(MESSAGE.AFTER_DISCOUNT);
    OutputView.printResult(`${afterDiscount.toLocaleString()}원`);
    OutputView.printResult('');
  }

  printBadge(totalDiscount, eventPlanner) {
    OutputView.printResult(MESSAGE.DECEMBER_BADGE);
    if (totalDiscount === 0) {
      OutputView.printResult('없음');
      OutputView.printResult('');
      return;
    }

    OutputView.printResult(eventPlanner.getEventBadge(totalDiscount));
  }
}

export default App;
