export const tradingPrompts = {
  longterm: (data: any) =>
    `Analyze long-term trading opportunities based on: ${JSON.stringify(data)}`,
  arbitrage: (data: any) =>
    `Identify arbitrage opportunities from: ${JSON.stringify(data)}`,
};
