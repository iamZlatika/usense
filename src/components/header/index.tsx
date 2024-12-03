import './styles.css'

interface IHeader {
    dollarRate: number
    euroRate: number
}

const Header = ({dollarRate, euroRate}: IHeader) => {
    const uahSymbol = '\u20B4'

    return (
        <div className="header component">
            <div className="header__wrapper">
                <div className="header__rates">
                    <div className="header__rate">
                        <span>Dollar: </span> {dollarRate} {uahSymbol}
                    </div>
                    <div className="header__rate">
                        <span>Euro: </span>{euroRate} {uahSymbol}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header