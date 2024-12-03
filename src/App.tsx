import './App.css'
import Header from "./components/header";
import Card from "./components/card";
import { getCurrency } from "./services.ts";
import { useCurrencyRates } from "./hooks/useCurrencyRates.ts";
import Spinner from "./components/spinner";
import ErrorCard from "./components/error-card";

function App() {
    const {rates, loading, error} = useCurrencyRates();

    return (
        <div className="app-container">
            {loading && <Spinner/>}
            {rates.USD && rates.EUR &&
                (
                    <>
                        <Header dollarRate={getCurrency(rates.USD)} euroRate={getCurrency(rates.EUR)}/>
                        <Card dollarRate={getCurrency(rates.USD)} euroRate={getCurrency(rates.EUR)}/>
                    </>
                )
            }
            {error && <ErrorCard/>}
        </div>
    )
}

export default App
