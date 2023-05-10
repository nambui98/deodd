import { useEffect, useRef } from 'react';

export default function IntervalManager() {
    const intervalsRef: any = useRef([]);

    useEffect(() => {
        return () => {
            intervalsRef.current.forEach((interval: any) => clearInterval(interval));
            intervalsRef.current = [];
        };
    }, []);

    function setInterval(callback: Function, delay: number) {
        const intervalId = window.setInterval(callback, delay);
        intervalsRef.current.push(intervalId);
        return intervalId;
    }

    function clearInterval(intervalId: any) {
        window.clearInterval(intervalId);
        intervalsRef.current = intervalsRef.current.filter((id: any) => id !== intervalId);
    }

    return null;
}