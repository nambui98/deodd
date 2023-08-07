import { MinusBeforeSpin } from 'constants/index';
import { addDays, differenceInMilliseconds, differenceInSeconds, isAfter, isBefore, isEqual, setHours, setMinutes, setSeconds } from "date-fns";
import { utcToZonedTime } from 'date-fns-tz';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

interface LotteryContextType {
	isRollComing: boolean;
	timeRemaining: number | null;
	isRolling: boolean;
	isRollEnd: boolean;
	isWinPrize: boolean;
	openModalBuyTicket: boolean;
	setOpenModalBuyTicket: Dispatch<SetStateAction<boolean>>;
	openModalBuyRunOut: boolean;
	setOpenModalBuyRunOut: Dispatch<SetStateAction<boolean>>;
	openModalApprove: boolean;
	setOpenModalApprove: Dispatch<SetStateAction<boolean>>;
	openModalBuySuccess: boolean;
	setOpenModalBuySuccess: Dispatch<SetStateAction<boolean>>;

	openModalProvablyFair: boolean;
	setOpenModalProvablyFair: Dispatch<SetStateAction<boolean>>;
}

const LotteryContext = createContext<LotteryContextType>({
	isRollComing: false,
	timeRemaining: null,
	isRolling: false,
	isRollEnd: false,
	isWinPrize: false,
	openModalBuyTicket: false,
	setOpenModalBuyTicket: () => { },

	openModalBuyRunOut: false,
	setOpenModalBuyRunOut: () => { },

	openModalApprove: false,
	setOpenModalApprove: () => { },

	openModalBuySuccess: false,
	setOpenModalBuySuccess: () => { },

	openModalProvablyFair: false,
	setOpenModalProvablyFair: () => { },
})

export const useLotteryContext = () => useContext(LotteryContext);

export const LotteryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isRollComing, setIsRollComing] = useState<boolean>(false);
	const [isRolling, setIsRolling] = useState<boolean>(false);
	const [isRollEnd, setIsRollEnd] = useState<boolean>(false);
	const [isWinPrize, setIsWinPrize] = useState<boolean>(false);
	const [openModalBuyTicket, setOpenModalBuyTicket] = useState<boolean>(false);
	const [openModalBuyRunOut, setOpenModalBuyRunOut] = useState<boolean>(false);
	const [openModalApprove, setOpenModalApprove] = useState<boolean>(false);
	const [openModalBuySuccess, setOpenModalBuySuccess] = useState<boolean>(false);
	const [openModalProvablyFair, setOpenModalProvablyFair] = useState<boolean>(false);

	let currentDate = new Date();
	let dateSpin = utcToZonedTime(currentDate, 'UTC');
	dateSpin.setHours(15);
	dateSpin.setMinutes(0);
	dateSpin.setSeconds(0);
	// if (isAfter(currentDate, dateSpin)) {
	// 	if (currentDate.getDay() >= 6 && currentDate.getDay() <= 1) {
	// 		dateSpin.setDate()
	// 	}
	// 	dateSpin.setDate(dateSpin.getDate() + 1);
	// }

	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
	// const [targetTime, setTargetTime] = useState<Date | null>(null);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		const now = new Date("2023-08-10T15:00:01Z");

	// 		const dayOfWeek = now.getUTCDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
	// 		const hour = now.getUTCHours();

	// 		// if ((dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) && hour < 15) { // Countdown only before 3 PM UTC
	// 		// 	const targetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 15, 0, 0, 0));
	// 		// 	const remaining = targetTime.getTime() - now.getTime();
	// 		// 	const dateComing = new Date();
	// 		// 	dateComing.setMinutes(dateComing.getMinutes() + MinusBeforeSpin);
	// 		// 	setTimeRemaining(remaining);
	// 		// 	// setTargetTime(targetTime);
	// 		// 	if (targetTime) {
	// 		// 		const timeIsComing = isBefore(targetTime, dateComing) && isBefore(new Date(), targetTime);
	// 		// 		setIsRollComing(timeIsComing);
	// 		// 	}
	// 		// } else {
	// 		// 	setTimeRemaining(null);
	// 		// }
	// 		if ((dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) && hour < 15) { // Monday, Wednesday, Friday before 15:00 UTC
	// 			const targetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 15, 0, 0, 0));
	// 			const remaining = targetTime.getTime() - now.getTime();

	// 			if (remaining > 0) {
	// 				setTimeRemaining(remaining);
	// 			} else {
	// 				const nextTargetDay = (dayOfWeek === 1) ? 3 : (dayOfWeek === 3) ? 5 : 1; // Calculate next target day
	// 				const nextTargetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + (nextTargetDay + (nextTargetDay <= dayOfWeek ? 7 : 0) - dayOfWeek), 15, 0, 0, 0));
	// 				const timeSinceLastTarget = now.getTime() - targetTime.getTime();
	// 				const timeUntilNextTarget = nextTargetTime.getTime() - now.getTime();

	// 				setTimeRemaining(timeUntilNextTarget - timeSinceLastTarget);
	// 			}
	// 		} else {
	// 			setTimeRemaining(null);
	// 		}
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, []);

	// const currentTime = new Date("2023-08-07T15:00:01Z");
	useEffect(() => {
		const interval = setInterval(() => {
			// const currentTime = new Date("2023-08-07T15:17:00Z");
			const currentTime = new Date();

			const nextSpinDate = getNextSpinDate(currentTime);
			const timeRemaining = calculateCountdown(currentTime, nextSpinDate);
			const dateComing = new Date(currentTime);
			dateComing.setMinutes(dateComing.getMinutes() + MinusBeforeSpin);
			setTimeRemaining(timeRemaining);
			const timeIsComing = isBefore(nextSpinDate, dateComing) && timeRemaining > 0;
			setIsRollComing(timeIsComing);

			const timeIsRolling = new Date(currentTime);
			timeIsRolling.setMinutes(timeIsRolling.getMinutes() + 1)
			timeIsRolling.setSeconds(0);
			const checkTimeIsRolling = isBefore(nextSpinDate, timeIsRolling);
			setIsRolling(checkTimeIsRolling)

			const timeIsRollEnd = new Date(currentTime);
			timeIsRollEnd.setMinutes(timeIsRollEnd.getMinutes() + 2)
			timeIsRollEnd.setSeconds(0);
			const checkTimeIsRollEnd = isBefore(nextSpinDate, timeIsRollEnd);
			setIsRollEnd(checkTimeIsRollEnd)

		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	function calculateCountdown(currentDate: Date, spinDate: Date): number {
		debugger
		return differenceInMilliseconds(spinDate, currentDate);
	}
	const mapDayToTargetDay: Record<number, number> = {
		0: 1,
		1: 2,
		2: 1,
		3: 2,
		4: 1,
		5: 3,
		6: 2,
	}

	// function getNextSpinDate(currentDate: Date): Date {
	// 	let nextSpinDate = currentDate;
	// 	if (nextSpinDate.getUTCDay() === 1 || nextSpinDate.getUTCDay() === 3 || nextSpinDate.getUTCDay() === 5) {
	// 		const targetTime = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 15, 0, 0, 0));
	// 		if (isAfter(currentDate, targetTime)) {
	// 			nextSpinDate = addDays(nextSpinDate, nextSpinDate.getUTCDay() === 5 ? 3 : 2);
	// 		}
	// 	} else {
	// 		nextSpinDate = addDays(nextSpinDate, mapDayToTargetDay[nextSpinDate.getUTCDay()]);
	// 	}

	// 	return new Date(Date.UTC(nextSpinDate.getUTCFullYear(), nextSpinDate.getUTCMonth(), nextSpinDate.getUTCDate(), 15, 0, 0, 0));
	// }
	function getNextSpinDate(currentDate: Date): Date {
		let nextSpinDate = currentDate;
		// if (nextSpinDate.getUTCDay() === 1 || nextSpinDate.getUTCDay() === 3 || nextSpinDate.getUTCDay() === 5) {
		// 	const targetTime = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 15, 0, 0, 0));
		// 	if (isAfter(currentDate, targetTime)) {
		// 		nextSpinDate = addDays(nextSpinDate, nextSpinDate.getUTCDay() === 5 ? 3 : 2);
		// 	}
		// } else {
		// 	nextSpinDate = addDays(nextSpinDate, mapDayToTargetDay[nextSpinDate.getUTCDay()]);
		// }
		let minutesTarget = 0;
		if (nextSpinDate.getMinutes() <= 16) {
			minutesTarget = 15;
		} else if (nextSpinDate.getMinutes() <= 31) {
			minutesTarget = 30;
		} else if (nextSpinDate.getMinutes() <= 46) {
			minutesTarget = 45;
		} else if (nextSpinDate.getMinutes() <= 61) {
			minutesTarget = 60;
		}
		// return new Date(nextSpinDate);
		return new Date(nextSpinDate.getFullYear(), nextSpinDate.getMonth(), nextSpinDate.getDate(), nextSpinDate.getHours(), minutesTarget, 0, 0);
	}
	// if (timeRemaining !== null) {
	// 	const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
	// 	const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
	// 	const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
	// 	console.log(hours + '-' + minutes + '-' + seconds);
	// }
	// zonedDate.setDate(13)
	// if(zonedDate.getDay()===1)
	// console.log(zonedDate.getDay());


	// dateSpin.setUTCHours(15);
	// // dateSpin.setHours(17);
	// dateSpin.setUTCMinutes(0);
	// dateSpin.setUTCSeconds(0);
	// console.log(dateSpin);


	// dateSpin = new Date(dateSpin.getUTCFullYear()+'-'+ dateSpin.getUTCMonth()  "2023-07-27T03:20:00Z");




	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setCurrentTime(new Date());
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, []);
	const value: LotteryContextType = useMemo(() => {
		return (
			{
				isRollComing,
				timeRemaining: timeRemaining,
				isRolling,
				isRollEnd,
				isWinPrize,
				openModalBuyTicket,
				setOpenModalBuyTicket,
				openModalApprove,
				setOpenModalApprove,
				openModalBuyRunOut,
				setOpenModalBuyRunOut,
				openModalBuySuccess,
				setOpenModalBuySuccess,
				openModalProvablyFair,
				setOpenModalProvablyFair
			}
		)
	}, [isRollComing, timeRemaining, isRolling, isRollEnd, isWinPrize, openModalBuyTicket, openModalApprove, openModalBuyRunOut, openModalBuySuccess, openModalProvablyFair])
	return <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>
}