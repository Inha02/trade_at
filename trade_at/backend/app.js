import axios from "axios";

// 심볼 리스트 가져오기
export const fetchSymbols = async () => {
    const url = `https://api.binance.com/api/v3/exchangeInfo`;
    const response = await axios.get(url);
    return response.data.symbols
        .filter((symbol) => symbol.quoteAsset === "USDT") // USDT 페어만 필터링
        .map((symbol) => symbol.symbol);
};

// 특정 심볼 데이터 가져오기
export const fetchBinanceData = async (symbol = "BTCUSDT", interval = "1h") => {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`;
    const response = await axios.get(url);

    return response.data.map((d) => ({
        date: new Date(d[0]), // Open time
        open: parseFloat(d[1]), // Open price
        high: parseFloat(d[2]), // High price
        low: parseFloat(d[3]), // Low price
        close: parseFloat(d[4]), // Close price
        volume: parseFloat(d[5]), // Volume
    }));
};
