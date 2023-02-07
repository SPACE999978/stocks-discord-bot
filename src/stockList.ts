const stockList: {
  fullSymbol: string; // symbol that's used to query the Yahoo Finance API
  displaySymbol: string; // symbol that's shown in the name
}[] = [
  {
    fullSymbol: 'ES=F',
    displaySymbol: 'ES',
  },
  {
    fullSymbol: 'YM=F',
    displaySymbol: 'DJI',
  },
  {
    fullSymbol: 'NQ=F',
    displaySymbol: 'NQ',
  },
  {
    fullSymbol: 'BTC-USD',
    displaySymbol: 'BTC',
  },
  {
    fullSymbol: 'ETH-USD',
    displaySymbol: 'ETH',
  },
];

export default stockList;
