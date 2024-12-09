import { TRate } from '../../helpers/types'
import './styles.css'

interface IHeader {
    rates: TRate,
}

const Header = ({ rates }: IHeader) => {
    const uahSymbol = '\u20B4'

    return (
        <div className="header component">
            <div className="header__wrapper">
                <div className="header__rates">
                    <div className="header__rate">
                        <span>Dollar: </span> {rates.USD} {uahSymbol}
                    </div>
                    <div className="header__rate">
                        <span>Euro: </span>{rates.EUR} {uahSymbol}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header