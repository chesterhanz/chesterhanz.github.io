let count = 0;

const counter = document.getElementById('counter');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const reset = document.getElementById('reset');

function updateCounter(){
  if ( count > 0 ){
    counter.style.color = "green";
  }
  else if (count < 0){
    counter.style.color = "red";
  }
  else {
    counter.style.color = "black";
  }
  counter.textContent = count;
}
increase.addEventListener('click', () => {
  count++;
  updateCounter();
});

decrease.addEventListener('click', () => {
  count--;
  updateCounter();
});

reset.addEventListener('click', () => {
  count = 0;
  updateCounter();
});
