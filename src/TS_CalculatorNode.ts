interface funSignature {
  (x: number, y: number): number;
}

interface calculate {
  (operation: string, x: number, y: number): number | string;
}

// types declaration for class TS_Calculator
interface TS_CalculatorInterface {
  result: number;
  add: funSignature;
  subtract: funSignature;
  multiply: funSignature;
  divide: funSignature;
  calculate: calculate;
}

class TS_Calculator implements TS_CalculatorInterface {
  // result is NaN because on object creation no calculation happened
  result = NaN;

  // should be private but it's not worth implementing
  add: funSignature = (x, y) => {
    return x + y;
  }
  // should be private but it's not worth implementing
  subtract: funSignature = (x, y) => {
    return x - y;
  }
  // should be private but it's not worth implementing
  multiply: funSignature = (x, y) => {
    return x * y;
  }
  // should be private but it's not worth implementing
  divide: funSignature = (x, y) => {
    if(y === 0) {
      return NaN;
    }

    return x / y;
  }

  // uses this.result to prevent redeclaring new variable on every call
  // if this.result is NaN returns error message
  // otherwise returns calculated result
  calculate:calculate = 
  (operation: string, x: number, y: number): number | string => {
    if(operation === '+') {
      this.result = this.add(x, y);
    }
    else if(operation === '-') {
      this.result = this.subtract(x, y);
    }
    else if(operation === '*') {
      this.result = this.multiply(x, y);
    }
    else if(operation === '/') {
      this.result = this.divide(x, y);
    }
    
    return Number.isNaN(this.result) ? 
      'Unable to do calculation.' : this.result;
  }
}

export { TS_Calculator };
