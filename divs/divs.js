let elt = document.getElementById('calculator');
  //elt.style.visibility = 'hidden';
let divBase = document.getElementById("baseInput");
//divBase.style.visibility = 'hidden';
document.getElementById("nText").value = "";
let calculator = Desmos.GraphingCalculator(elt);
calculator.updateSettings({ expressionsCollapsed: true });
elt.style.height = (0.9*window.innerHeight).toString()+"px"; 

console.log(window.innerHeight)
divRad = document.getElementById("rads").addEventListener("change", radiosChecked, false);

function radiosChecked(){
  radios = document.getElementsByName("regsOpts");
  radios.forEach(element => {
    if (element.checked==true){
      console.log(element.id)
    }
  });
}




//elt.style.width = (document.body.clientWidth/2).toString()+"px";
//elt.style.height = (document.body.clientHeight*2).toString()+"px";