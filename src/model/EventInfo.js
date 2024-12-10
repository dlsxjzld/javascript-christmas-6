import Calendar from './Calendar.js';

export default class EventInfo {
  constructor(visitDate) {
    this.visitDate = Number(visitDate);
    this.calendar = new Calendar(visitDate);
  }

  getChristmasDDayDiscount() {
    if (this.visitDate < 1 || this.visitDate > 25) {
      return 0;
    }
    return 1000 + (this.visitDate - 1) * 100;
  }

  getKindOfDay() {
    const kindOfDay = this.calendar.getKindOfDay();
    return kindOfDay;
  }

  getKindOfDayDiscount(kindOfMenu) {
    const kindOfDay = this.calendar.getKindOfDay();
    if (kindOfDay === '평일' && kindOfMenu === '디저트') {
      return 2023;
    }
    if (kindOfDay === '휴일' && kindOfMenu === '메인') {
      return 2023;
    }
    return 0;
  }

  getStarDiscount() {
    const canStarDiscount = this.calendar.hasStarDay();
    if (canStarDiscount) {
      return 1000;
    }
    return 0;
  }

  getFreeGift(totalPriceBeforeDiscount) {
    if (totalPriceBeforeDiscount >= 120_000) {
      return { menu: '샴페인', quantity: 1 };
    }
    return { menu: '없음', quantity: 0 };
  }
}
