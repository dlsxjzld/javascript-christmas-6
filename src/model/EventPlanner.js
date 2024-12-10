import { getBadge } from '../constants/badge.js';
import { MENU_KIND, MENU_PRICE } from '../constants/menu.js';
import EventInfo from './EventInfo.js';

export default class EventPlanner {
  constructor(visitDate, orders) {
    this.visitDate = Number(visitDate);
    this.orders = orders.split(',').map((order) => {
      const [menu, quantity] = order.split('-');
      return [menu, Number(quantity)];
    });
  }

  start() {
    this.eventInfo = new EventInfo(this.visitDate);
  }

  getCanEvent() {
    return this.getTotalPrice() >= 10_000;
  }

  getKindOfDay() {
    return this.eventInfo.getKindOfDay();
  }

  getAllOrders() {
    return this.orders;
  }

  getTotalPrice() {
    return this.orders.reduce(
      (acc, [menu, quantity]) => acc + MENU_PRICE[menu] * quantity,
      0,
    );
  }

  getChristmasDDayDiscount() {
    const christmasDiscount = this.eventInfo.getChristmasDDayDiscount();
    return christmasDiscount;
  }

  getKindOfDayDiscount() {
    return this.orders
      .map(([menu, quantity]) => {
        const price = this.eventInfo.getKindOfDayDiscount(MENU_KIND[menu]);
        return price * quantity;
      })
      .reduce((acc, cur) => acc + cur, 0);
  }

  getStarDiscount() {
    return this.eventInfo.getStarDiscount();
  }

  getFreeGift() {
    const { menu, quantity } = this.eventInfo.getFreeGift(this.getTotalPrice());

    return { menu, quantity, price: MENU_PRICE[menu] * quantity };
  }

  getEventBadge(totalDiscount) {
    return getBadge(totalDiscount);
  }
}
