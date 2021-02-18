import * as readline from 'readline';
import { TS_Calculator } from './TS_CalculatorNode';

// declare types for TS_CalculatorLoop
interface TS_CalculatorLoopInterface {
  date: Date;
  calculator: TS_Calculator;
  readLine: readline.Interface;
  runLoop(): void;
  handleInput(inputStr: string): void;
  recursiveInput(promptStr: string): void;
  currentTime(): string;
}

// there are limitations, for example it can't handle -3-3
// cause it's gonna try to do ''-3 which isn't viable
class TS_CalculatorLoop implements TS_CalculatorLoopInterface {
  // used to get runLoop's start and end time
  date = new Date();
  calculator = new TS_Calculator();
  readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // should be private but...
  // takes full input string
  handleInput(inputStr: string): void {
    // split string on +, -, /, * and add them along values
    // example: 3*3/5/5 gives ['3', '*', '5', '/'...]
    const inputChunks = inputStr.split(/(\+|\-|\/|\*)/);
  
    // check if input is split to exactly 3 values
    if(inputChunks.length === 3) {

      // parse first value as it should be number
      const leftValue = parseFloat(inputChunks[0]);
      // this should be operation
      const operation = inputChunks[1];
      // parse third value as it should be number
      const rightValue = parseFloat(inputChunks[2]);

      const result = this.calculator
        .calculate(operation, leftValue, rightValue);
        
      console.log(`>> Result: ${result}`);
    }
    else {
      console.log('>> Wrong input');
    }
  }
  // should be private but...
  recursiveInput(promptStr: string): void {    
    this.readLine.question(promptStr, (inputStr: string) => {
      // exit if user wants to
      if(inputStr === 'Q') {
        console.log(`Closed program at: ${this.currentTime()}`)
        return this.readLine.close();
      }

      this.handleInput(inputStr);
      
      // pass myself from now to end of program '>> ' prompt string
      this.recursiveInput('>> ');
    });
  }

  /**
   * @method runLoop starts calculator loop
   */
  runLoop(): void {
    console.log(`Started program at: ${this.currentTime()}`);

    const firstPromptStr =
      `>> Input something, follow by enter.\
      \n   Enter \'Q\' to Quit.\
      \n\n   Examples:\
      \n   2+2\
      \n   5-1\
      \n   5*5\
      \n   5/2\
      \n>> `;

    // on first run recieve instructions
    this.recursiveInput(firstPromptStr);
  }
  
  // should be private but...
  // get current time in format hr:min:sec PM|AM
  currentTime(): string {
    const startHr = this.date.getHours();
    const startMin = this.date.getMinutes();
    const startSec = this.date.getSeconds();
    const pmam = startHr > 12 ? 'PM' : 'AM';
    
    return `${startHr}h:${startMin}m:${startSec}s ${pmam}`;
  }
}

export { TS_CalculatorLoop };
