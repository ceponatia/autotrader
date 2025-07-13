export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradingPair {
  base: string;
  quote: string;
  symbol: string;
}

export interface TradeSignal {
  action: "buy" | "sell" | "hold";
  confidence: number;
  reason: string;
}
