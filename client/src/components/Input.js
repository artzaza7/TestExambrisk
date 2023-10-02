import { useState } from 'react';

function Input(props) {
    const { title, functionSendDataBack } = props
    const [inputValue, setInputValue] = useState('');

    return <div>
        {/* Input  */}
        <div className="col-12 d-flex justify-content-center align-items-center px-3">
            <input type="text" className="form-control me-1" value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            <button type="button" className="btn btn-success ms-1" onClick={() => {
                functionSendDataBack(inputValue)
            }}>{title}</button>
        </div>
    </div>;
}

export default Input;
