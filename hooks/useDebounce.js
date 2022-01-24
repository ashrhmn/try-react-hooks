import React, { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounce = (callack, delay, dependencies) => {
    const { clear, reset } = useTimeout(callack, delay)
    useEffect(reset, [...dependencies, reset])
    useEffect(clear, [clear])
};

export default useDebounce;