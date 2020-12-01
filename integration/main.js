initCalc()
function initCalc(){
  let elt = document.getElementById('calculator');
  //elt.style.visibility = 'hidden';
  calculator = Desmos.GraphingCalculator(elt);
  calculator.updateSettings({ expressionsCollapsed: true });
  elt.style.width = (0.8*window.innerWidth/2).toString()+"px";
  elt.style.height = (0.9*window.innerHeight).toString()+"px"; 
}