import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { MESSAGE } from './constants/message.js';

class App {
  async run() {
    OutputView.printResult(MESSAGE.EVENT_PLANNER_INSTRUCTION);
    const input = await this.getVisitDate();
    console.log('input', input);
  }

  async getVisitDate() {
    try {
      const input = await InputView.readUserInput(MESSAGE.ASK_VISIT_DATE);
      const validate = (input) => true;
      validate(input);
      return input;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getVisitDate();
    }
  }
}

export default App;
