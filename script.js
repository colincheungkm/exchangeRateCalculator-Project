'use strict';

// GET request to https://www.exchangerate-api.com/

// DOM
const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const swapBtn = document.getElementById('swap');
const rate = document.getElementById('rate');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

// Fetch Exchange Rate and update the DOM
function calculate() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  fetch(`https://v6.exchangerate-api.com/v6/39ec49bf4565f3b9e5a093c6/latest/${currencyOneValue}`)
    .then((response) => response.json())
    .then((data) => {
      const fxRate = data.conversion_rates[currencyTwoValue];
      rate.innerText = `1 ${currencyOneValue} = ${fxRate} ${currencyTwoValue}`;
      amountTwo.value = (amountOne.value * fxRate).toFixed(2);
    });
}

swapBtn.addEventListener('click', () => {
  const temporary = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temporary;

  calculate();
});

// LISTENERS
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

calculate();
