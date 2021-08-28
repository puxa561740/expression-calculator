function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
  let str1 = filt(str)
  let strBrac = str1.join('').split('')
  let sumNum = [...str1]
  let brac = []
  let arrSlice = []
  let sumNumArr
  let breakFor = []
  let breakForIn = []

  sumNum.map((a, i) => {
    if(a === "/") {
      if(sumNum[i+1] === '0'){
        breakFor.push(1)
      }
    }
  })
  
  if(breakForIn.length > 0) {
    return 
  }

  if(breakFor.length > 0) {
    throw new Error("TypeError: Division by zero.")
  }

  for(let i = 0; i < sumNum.length; i++) {
    brac = findBrac(sumNum, brac)
    brac = cycleFunc(brac,sumNum,arrSlice, sumNumArr, breakFor)
    if(breakForIn.length > 0) {
      throw new Error("ExpressionError: Brackets must be paired")
    }
    if(breakFor.length > 0 ) {
      throw new Error("TypeError: Division by zero.")
    }
    if( brac === undefined || brac.length === 0 && sumNum.length === 1) {
      cycleFunc(brac,sumNum, arrSlice, sumNumArr, breakFor)
      break
    }
  }
  brac = findBrac(sumNum, brac)
  brac = cycleFunc(brac,sumNum,arrSlice, sumNumArr, breakFor)

  let a = +sumNum[0]
  if(a !== a) {
    for(let i = 0; i < strBrac.length; i++) {
      if(strBrac[i] === ')' && breakForIn.length === 0) {
        throw new Error("ExpressionError: Brackets must be paired")
      }
      if(strBrac[i] === '(') {
        breakForIn.push(strBrac[i])
      }
      if(strBrac[i] === ')'){
        breakForIn.pop()
      }
    }
  }
  if(breakForIn.length > 0 ){
    throw new Error("ExpressionError: Brackets must be paired")
  }
  return a
}

const filt = (str) => {
  if(str.split(' ').length === 1) {
    return str.split('')
  }
  return str.split(' ').filter(a => {
    if(a !== '') {
      return a
    }
  })
}

const findBrac = (str1, brac) => {
  let bracket = {
    arrBracket1: [],
    breakFor1: []
  }

  str1.map((a, i) => {
    if(a === "(" ) {
      bracket.breakFor1.push(a)
    }
    if(a === ')' && bracket.breakFor1[bracket.breakFor1.length-1] === '(') {
      bracket.breakFor1.pop()
    }
  })

  str1.map((a, i) => {
    if(a === "(" ) {
      bracket.arrBracket1.push(i)
    }
    if(a === ')') {
      brac.push([bracket.arrBracket1[bracket.arrBracket1.length-1], i])
      bracket.arrBracket1.pop()
    }
  })
  
  return brac
}


const cycleFunc = (brac, sumNum, arrSlice, sumNumArr, breakFor) => {
  if( brac === undefined || brac.length === 0 ) {
    for(let i = 0; i < sumNum.length; i++) {
      if(sumNum.find(a=> a === "/")){
        funCalk1(sumNum, sumNumArr, breakFor)
        if(breakFor.length > 0) {
          return 
        }
      } else if (sumNum.find(a=> a === "*" )) {
        funCalk1(sumNum, sumNumArr, breakFor)
      } else if (sumNum.find(a=> a === "-" )){
        funCalk2(sumNum, sumNumArr, breakFor)
      } else if(sumNum.find(a=> a === "+" )) {
        funCalk2(sumNum, sumNumArr, breakFor)
      }
    }
    return 
  } 
  if(brac.length > 0) {
    arrSlice = (sumNum.slice(brac[0][0]+1, brac[0][1]))
    for(let i = 0; i < arrSlice.length; i++) {
      if (arrSlice.find(a=> a === "/" )) {
        funCalk1(arrSlice, sumNumArr, breakFor)
      } else if(arrSlice.find(a=> a === "*" )){
        funCalk1(arrSlice, sumNumArr, breakFor)
      } else if(arrSlice.find(a=> a === "-" )){
        funCalk2(arrSlice, sumNumArr, breakFor)
      } else if(arrSlice.find(a=> a === "+" )){
        funCalk2(arrSlice, sumNumArr,breakFor)
      }
    }
    sumNum.splice(brac[0][0], (brac[0][1] - brac[0][0])+1, arrSlice[0] + "")
    return brac = []
  }
} 


const funCalk1 = (arrSlice, sumNumArr, breakFor) => {
  for(let i = 0; i < arrSlice.length; i++){
    if(arrSlice[i] === '*' ){
      if(typeof(+arrSlice[i-1]) === 'number' && typeof(+arrSlice[i+1]) === 'number'){
        sumNumArr = Number(arrSlice[i-1]) * Number(arrSlice[i+1])
        arrSlice.splice((i-1), 3, sumNumArr )
        i=0
      }
      
    } 
    if(arrSlice[i] === "/"){
      if(typeof(+arrSlice[i-1]) === 'number' && typeof(+arrSlice[i+1]) === 'number'){
       if(arrSlice[i+1] === "0") {
        breakFor.push(1)
        return 
       }
        sumNumArr = Number(arrSlice[i-1]) / Number(arrSlice[i+1])
        arrSlice.splice((i-1), 3, parseFloat(sumNumArr).toPrecision(15))
        i=0
      }
    }
  }
}

const funCalk2 = (arrSlice, sumNumArr) => {
  for(let i = 0; i < arrSlice.length; i++){
    if(arrSlice[i] === '-' ){
      if(typeof(+arrSlice[i-1]) === 'number' && typeof(+arrSlice[i+1]) === 'number'){
        if(arrSlice[i+1] < 0) {
          sumNumArr = Number(arrSlice[i-1]) + Math.abs(Number(arrSlice[i+1]))
          arrSlice.splice((i-1), 3, sumNumArr )
          i=0
        } else {
          sumNumArr = Number(arrSlice[i-1]) - Number(arrSlice[i+1])
          arrSlice.splice((i-1), 3, sumNumArr )
          i=0
        }
      }
    } 
    if(arrSlice[i] === "+"){
      if(typeof(+arrSlice[i-1]) === 'number' && typeof(+arrSlice[i+1]) === 'number'){
        sumNumArr = Number(arrSlice[i-1]) + Number(arrSlice[i+1])
        arrSlice.splice((i-1), 3, sumNumArr)
        i=0
      }
    }
  }
}

module.exports = {
    expressionCalculator
}