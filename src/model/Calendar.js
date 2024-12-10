export default class Calendar {
  #days = ['일', '월', '화', '수', '목', '금', '토'];

  #kindOfDays = {
    일: '평일',
    월: '평일',
    화: '평일',
    수: '평일',
    목: '평일',
    금: '휴일',
    토: '휴일',
  };

  // #christmasDDay = {
  //   MIN:1,
  //   MAX:25
  // }

  #stars = [3, 10, 17, 24, 25, 31];

  constructor(input) {
    this.date = new Date(`2023-12-${input}`);
  }

  getKindOfDay() {
    const day = this.date.getDay();
    return this.#kindOfDays[this.#days[day]];
  }

  hasStarDay() {
    return this.#stars.includes(this.date.getDate());
  }
}
