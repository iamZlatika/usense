import './App.css'
import Header from "./components/header";
import Card from "./components/card";
import { filterRates } from "./helpers/services.ts";
import { useCurrencyRates } from "./hooks/useCurrencyRates.ts";
import Spinner from "./components/spinner";
import ErrorCard from "./components/error-card";

function App() {
    const {rates, loading, error} = useCurrencyRates();

    const selectedCurrencies = ["EUR", "UAH", "USD"];

    const filteredCurrencies = filterRates(rates,selectedCurrencies)

    return (
        <div className="app-container">
            {loading && <Spinner/>}
            {rates.USD && rates.EUR &&
                (
                    <>
                        <Header rates={filteredCurrencies}  />
                        <Card rates={filteredCurrencies}/>
                    </>
                )
            }
            {error && <ErrorCard/>}
        </div>
    )
}

export default App
