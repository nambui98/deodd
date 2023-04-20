import { useEffect, useRef } from "react";

export const useAnimationFrame = (callback: Function) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef<any>(null);
    const previousTimeRef = useRef<any>(null);

    const animate = (time: number) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef?.current;
            callback(deltaTime)
        }
        previousTimeRef.current! = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}
