function regressionGeneralized(n,x,y, isExp=false, isPot=false, isLn=false){
    let nPoints = x.length;
    function Afunc(last, i){
        let row = 0;
        for (let exp = 0; exp < Math.pow(n,2) ; exp++) {
            if (exp%n==0 && exp!=0){
                last = exp-1-i;
                i+=1;
            }        
            aux = 0
            x.forEach(x_i => {
                aux += Math.pow(x_i, exp-last);
            });
            if (exp!=0 && exp%n==0){
                row+=1;
            }
            A[row][parseInt(exp%n)] = aux;
        }
    }
    function makeArr(startValue, stopValue, cardinality) {
        var arr = [];
        var step = (stopValue - startValue) / (cardinality - 1);
        for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
        }
        return arr;
    }
    function Bfunc(){
        for (let exp = 0; exp < n; exp++) {
            let sum = 0;
            for (let i = 0; i < x.length; i++) {
                sum += Math.pow(x[i],exp)*y[i];              
            }
            b[exp] = sum;
        }
    }
    Afunc(0,0);
    Bfunc();
    console.log(A,b)
    s = math.multiply(math.inv(A),b);
    //console.log(Math.min.apply(Math,x),Math.max.apply(Math,x))
    range0 = Math.max.apply(Math,x) - Math.min.apply(Math,x);
    newX = makeArr(Math.min.apply(Math,x)-1, Math.max.apply(Math,x)+1,25);
    newY = [];
    for (let index = 0; index < newX.length; index++) {
        newY.push(0);
    }
    let eq = "";
    if (isExp == true){
      a = Math.exp(s[0]);
      b = s[1];
      console.log(a,b)
      return [s];
    }
    else if (isPot==true){
      a = Math.exp(s[0]);
      b = s[1];
      console.log(a,b)
      return [s];
    }
    else if (isLn==true){
      console.log(s[0],s[1]);
      return [s];
    }
    else{
      for (let index = 0; index < s.length; index++) {
        let i=0;
        //let nfg = s[index].toString();
        //console.log( math.rationalize(parseFloat(s[index].toLocaleString('fullwide', { useGrouping: false }))) );
        if (s[index]<0){
            eq += parseFloat(s[index].toLocaleString('fullwide', { useGrouping: false })).toString()+"x^"+parseFloat(index).toString();// + toString(x) + "^" + toString(index);
        }
        else{
            if (index==0){
                eq +=parseFloat(s[index].toLocaleString('fullwide', { useGrouping: false })).toString();
            }
            else{
                eq +="+"+parseFloat(s[index].toLocaleString('fullwide', { useGrouping: false })).toString()+"x^"+parseFloat(index).toString();
            }
        }
        newX.forEach(x_i=>{
            newY[i] += Math.pow(x_i,index)*s[index];
            i+=1
        });   
      } 
    }
    //console.log(math.simplify(eq).toString())
    //plot(newX,newY,x,y);
    //console.log(newX,newY,s)
    expression = math.simplify(eq).toString();
    plot(expression,x,y);
}

function generalizedExponential(n,x,y){
  let yLn = []
  y.forEach(y_i =>{
    yLn.push(Math.log1p(y_i-1));
  });
  res = regressionGeneralized(n,x,yLn, true, false, false);
}

function generalizedPotential(n,x,y){
  let yLn = [], xLn = [];
  y.forEach(y_i =>{yLn.push(Math.log1p(y_i-1));});
  x.forEach(x_i =>{xLn.push(Math.log1p(x_i-1));});
  res = regressionGeneralized(n,xLn,yLn, false, true, false);

}

function generalizedLogarithmic(n,x,y){
  let xLn= [];
  x.forEach(x_i => {xLn.push(Math.log1p(x_i-1));});
  res = regressionGeneralized(n, xLn,y, false, false, true);
}

function plot(expr=null,x,y){
  calculator.updateSettings({ expressionsCollapsed: true });
  //calculator.expressionsCollapsed = true;
  if (expr!=null){
    calculator.setExpression({ id: 'main', latex: expr });
  }
  for (let index = 0; index < x.length; index++) {
    calculator.setExpression({ id: index.toString(), latex: '('+x[index].toString()+','+y[index].toString()+')' });
  }
  ///calculator.updateSettings.expressionsCollapsed = true;
  
  //calculator.setExpression({id:'graph2', latex:'y=e^x'});
  //calculator.setExpression({id:'graph3', latex:'(2,3)'});    
}
let n=2, A=[], b=[];
for (let index = 0; index < n; index++) {
    A.push([]);  
    b.push([])  
}
for (let i = 0; i < n; i++) {
    b[i][0] = 0;
    for (let j = 0; j < n; j++) {
        A[i][j] = 0;
    }    
} 


//let x = [1,2,4,8,16,32,64];
//let y = [2,4,7,11,16,19,21];
//let anw = generalizedLogarithmic(n, x, y);
//let x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
//let y = [0.3,0.7,1.2,3.5,5.3,7.6,11,16,20,24.1,33.8,44,55.3,69.2,86,109.5,128.3,140.8,158.7,182.1,207.9,233,250,262.7,276.6,300.5]
//let x = [1,2,3,4];//[0, 0.108, 0.215, 0.322, 0.430, 0.537, 0.645, 0.752, 0.860];
//let y = [1,1,2,6];//[1.037, 1.402, 1.638, 1.774, 1.803, 1.715, 1.509, 1.214, 0.831];
//let name = window.prompt("Enter your name: ");
//let x =[1.7, 1.6, 2.8 ,5.6 ,1.3, 2.2, 1.3 ,1.1, 3.2 ,1.5 ,5.2, 4.6 ,5.8, 3.0]
//let y = [3.7, 3.9, 6.7, 9.5, 3.4, 5.6, 3.7, 2.7, 5.5, 2.9, 10.7, 7.6, 11.8, 4.1]
let x = [95,85,80,70,60]
let y = [85,95,70,65,70]
regressionGeneralized(n,x,y)
//console.log(name);
//n=4
//regressionGeneralized(n,x,y)
//plot(x,y)


