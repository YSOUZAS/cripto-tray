

const updateTime = () => {
  document.querySelector('.js-update-time').textContent = `at ${new Date().toLocaleTimeString()}`;
};


const getCoin = (coin, name) => {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD,BRL`;
  window.fetch(url).then((response) => {
    let data = response.json();
    data.then((value) => {
      document.querySelector(`.js-${name}-name`).textContent = `${coin}`;
      document.querySelector(`.js-${name}-usd`).textContent = `${value.USD}`;
      document.querySelector(`.js-${name}-brl`).textContent = `${value.BRL.toString().replace('.', ',')}`;
    });
  });
};

const getCoins = () => {
  getCoin('BTC', 'bitcoin');
  getCoin('ETH', 'ethereum');
  getCoin('XRP', 'ripple');
  getCoin('BCH', 'bitcoin-cash');
  getCoin('ADA', 'cardano');
  getCoin('LTC', 'litecoin');
};


const updateTable = () => {
  setInterval(updateTime, 1000);
  getCoins();
};

const tenMinutes = 10 * 60 * 1000;
setInterval(updateTable, tenMinutes);


document.addEventListener('DOMContentLoaded', updateTable);
