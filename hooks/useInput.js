import { useState } from 'react';

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue)
    return { value, onChange: (e) => setValue(e.target.value) }
};

export default useInput;