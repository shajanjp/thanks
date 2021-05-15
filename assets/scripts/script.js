---
---

const thanksContainer = document.getElementsByClassName('thanks-container')[0];

function generateRandomNumber(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}

function shaffle(ordered){
  let shuffled = [];
  for(var i=ordered.length; i>0; i--){
    let r =generateRandomNumber(0, i);
    shuffled.push(ordered.splice(r, 1)[0])
  }
  return shuffled;
}

function getThanksData() {
  return fetch('{{site.baseurl}}/data/thanks.json')
  .then(res => res.json())
  .catch(error =>{

  })
}

function makeThanks(thanksData){
  return `<div class="thanks animate__animated animate__fadeInUp">
  <p class="for">Thank you ${thanksData.for}</p>
  <p class="to-whom">
  <span class="to">${thanksData.to}</span> (<span class="who">${thanksData.who}</span>)
  </p>
  </div>`;
}

function startThanking(thanksData){
  let thanksCounter = 0;
  setInterval(() => {
    thanksContainer.innerHTML = makeThanks(thanksData[thanksCounter]);

    if(thanksCounter == thanksData.length - 1){
      thanksCounter = 0;
    }
    else{
      thanksCounter++;
    }
  }, 3500)
}


getThanksData()
.then(data => {
  startThanking(shaffle(data));
})