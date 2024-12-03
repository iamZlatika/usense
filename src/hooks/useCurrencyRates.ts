import { useEffect, useState } from 'react';

export const useCurrencyRates = () => {
    const [rates, setRates] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch("https://api.exchangerate-api.com/v4/latest/UAH");
                if (!response.ok) {
                    setError("Failed to fetch data");
                    return;
                }
                const data = await response.json();
                setRates(data.rates);
            } catch (err: unknown) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    return {rates, loading, error};
};
