

const updateTime = () => {
  document.querySelector('.js-update-time').textContent = `at ${new Date().toLocaleTimeString()}`;
};


const getCoin = (coin) => {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD,BRL`;
  window.fetch(url).then((response) => {
    let data = response.json();
    data.then((value) => {

      let table = document.getElementById('tbody');

      let row = table.insertRow(0);

      let cellCoin = row.insertCell(0);
      let cellUSD = row.insertCell(1);
      let cellBRL = row.insertCell(2);

      cellCoin.innerHTML = coin;
      cellUSD.innerHTML = value.USD;
      cellBRL.innerHTML = value.BRL.toString().replace('.', ',');
    });
  });
};

const getCoins = () => {
  getCoin('ADA');
  getCoin('XRP');
  getCoin('LTC');
  getCoin('BCH');
  getCoin('ETH');
  getCoin('BTC');
};


const updateTable = () => {
  setInterval(updateTime, 1000);
  getCoins();
};

const tenMinutes = 10 * 60 * 1000;
setInterval(updateTable, tenMinutes);


document.addEventListener('DOMContentLoaded', updateTable);
