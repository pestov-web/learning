import { useContext, useState } from 'react';
import FactResult from './FactResult';
import { ThemeContext } from '../App';


function getResult(value: number) {
    let res = 0;
    for(let i =0; i< 1_000_000_000; i++) {
        res = i;
    }
    return res - value;
}

function FactForm() {
    const theme = useContext(ThemeContext);

    const [value, setValue] = useState(0);


    return (
        <div className={'form-container form-container_' + theme}>
            <div className="form">
                <label className="form__label">
                    Введите значение
                </label>
                <input value={value}
                       className={'input input_' + theme}
                       type='number'
                       onChange={e => setValue(+e.target.value)}
                />
            </div>
            <div>{getResult(value)}</div>
            <FactResult factResult={0} />
        </div>
    );
}

export default FactForm;
