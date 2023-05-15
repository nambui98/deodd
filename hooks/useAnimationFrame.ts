import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (callback: Function) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef<any>(null);
    const previousTimeRef = useRef<any>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const animate = useCallback((time: number) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef?.current;
            callback(deltaTime)
        }
        previousTimeRef.current! = time;
        requestRef.current = requestAnimationFrame(animate);
    },[callback])

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]); // Make sure the effect runs only once
}
