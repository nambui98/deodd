import { MinusBeforeSpin, MinusWaitResultRoll } from 'constants/index';
import { addDays, differenceInMilliseconds, differenceInSeconds, isAfter, isBefore, isEqual, setHours, setMinutes, setSeconds } from "date-fns";
import { utcToZonedTime } from 'date-fns-tz';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSiteContext } from './SiteContext';
import { useQuery } from '@tanstack/react-query';
import { DeoddService } from 'libs/apis';
import { useWalletContext } from './WalletContext';
import { TicketType } from '@/templates/lottery/MyTicket';
import { BigNumber } from 'ethers';
import { JackpotType } from 'libs/types';

interface LotteryContextType {
	isRollComing: boolean;
	timeRemaining: number | null;
	timeRemainingEndRoll: number | null;
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

	openModalProvablyFair: { open: boolean, ticketSelected: (number | string | null)[] };
	setOpenModalProvablyFair: Dispatch<SetStateAction<{ open: boolean, ticketSelected: (number | string | null)[] }>>;

	drawIdValue: string | null;
	setDrawIdValue: Dispatch<SetStateAction<string | null>>;
	myTicketsCurrentLottery: TicketType[] | null | undefined
	dataLotteryBuyDrawId: JackpotType | null;
	resultRoll: JackpotType | null;
	isEndRoll: boolean,
	setIsEndRoll: (value: boolean) => void,
	currentLottery: JackpotType | undefined,
	prevLottery: JackpotType | undefined
}

const LotteryContext = createContext<LotteryContextType>({
	isRollComing: false,
	timeRemaining: null,
	timeRemainingEndRoll: null,
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

	openModalProvablyFair: {
		open: false,
		ticketSelected: [null, null, null, null, null, null]
	},
	setOpenModalProvablyFair: () => { },
	drawIdValue: null,
	setDrawIdValue: () => { },
	myTicketsCurrentLottery: null,
	dataLotteryBuyDrawId: null,
	resultRoll: null,
	isEndRoll: false,
	setIsEndRoll: () => { },
	currentLottery: {
		bonus: 0,
		draw_id: 0,
		res: null,
		initial_jackpot: '0',
		lottery_id: null
	},
	prevLottery: undefined
})

export const useLotteryContext = () => useContext(LotteryContext);

export const LotteryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { walletAddress } = useWalletContext();
	const [isRollComing, setIsRollComing] = useState<boolean>(false);
	const [isRolling, setIsRolling] = useState<boolean>(false);
	const [isRollEnd, setIsRollEnd] = useState<boolean>(false);
	const [isWinPrize, setIsWinPrize] = useState<boolean>(false);
	const [openModalBuyTicket, setOpenModalBuyTicket] = useState<boolean>(false);
	const [openModalBuyRunOut, setOpenModalBuyRunOut] = useState<boolean>(false);
	const [openModalApprove, setOpenModalApprove] = useState<boolean>(false);
	const [openModalBuySuccess, setOpenModalBuySuccess] = useState<boolean>(false);
	const [openModalProvablyFair, setOpenModalProvablyFair] = useState<{ open: boolean, ticketSelected: (number | string | null)[] }>({ open: false, ticketSelected: [null, null, null, null, null, null] });

	const [drawIdValue, setDrawIdValue] = useState<string | null>(null);

	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
	const [timeRemainingEndRoll, setTimeRemainingEndRoll] = useState<number | null>(null);
	const [isEndRoll, setIsEndRoll] = useState<boolean>(false);
	const [prevLottery, setPrevLottery] = useState<JackpotType | undefined>(undefined);

	const { data: currentLottery, refetch } = useQuery({
		queryKey: ["getCurrentLottery"],
		refetchOnWindowFocus: false,
		// refetchInterval: 5000,
		queryFn: DeoddService.getCurrentLottery,
		select: (data: any) => {
			if (data.status === 200) {
				return data.data.data;
			} else {
				return undefined
			}
		},
	});

	useEffect(() => {
		setDrawIdValue(currentLottery?.draw_id.toString() ?? null)
	}, [currentLottery])

	useEffect(() => {
		if (isEndRoll) {
			setPrevLottery(currentLottery);
			refetch();
		} else {
			setPrevLottery(undefined);
		}
	}, [isEndRoll])


	const { data: dataLotteryBuyDrawId } = useQuery({
		queryKey: ["lotteryBuyDrawId", drawIdValue],
		enabled: !!drawIdValue,
		refetchOnWindowFocus: false,
		queryFn: () => DeoddService.getLotteryResultByDrawId({ drawId: drawIdValue }),
		select: (data: any) => {
			if (data.status === 200) {
				// debugger
				return data.data.data;
			} else {
				return undefined
			}
		},
	});
	const drawIdMyTicketResultRoll: string | null = (prevLottery?.draw_id.toString() ?? currentLottery?.draw_id.toString()) ?? null;
	const { data: myTicketsCurrentLottery } = useQuery({
		queryKey: ["getMyTicketCurrentLottery", walletAddress, 100, drawIdMyTicketResultRoll],
		enabled: !!walletAddress,
		refetchOnWindowFocus: false,
		// suspense: myTickets.length > 0 ? false : true,
		queryFn: () => DeoddService.getMyTicket({ limit: 100, offset: 0, drawId: drawIdMyTicketResultRoll }),
		select: (data: any) => {
			let result: TicketType[] = [];
			if (data.status === 200) {
				result = data.data.data;
			} else {
				result = [];
			}
			return result;
		},
	});
	useEffect(() => {
		if (myTicketsCurrentLottery) {
			let checkHasPrize = myTicketsCurrentLottery.some(ticket => BigNumber.from(ticket.prize).gt(BigNumber.from(0)));
			setIsWinPrize(checkHasPrize);
		}
	}, [myTicketsCurrentLottery])
	const { data: resultRoll } = useQuery({
		queryKey: ["resultRoll", drawIdMyTicketResultRoll],
		enabled: isRolling,
		refetchOnWindowFocus: false,
		refetchInterval: 1000,
		queryFn: () => DeoddService.getLotteryResultByDrawId({ drawId: drawIdMyTicketResultRoll }),
		select: (data: any) => {
			if (data.status === 200) {
				return data.data.data;
			} else {
				return undefined
			}
		},
	});

	useEffect(() => {
		const interval = setInterval(() => {
			// const currentTime = new Date("2023-08-10T16:01:59Z");
			const currentTime = new Date();

			const nextSpinDate = getNextSpinDate(currentTime);
			const timeRemaining = calculateCountdown(currentTime, nextSpinDate);
			setTimeRemaining(timeRemaining);

			const dateComing = new Date(currentTime);
			dateComing.setMinutes(dateComing.getMinutes() + MinusBeforeSpin);
			const timeIsComing = isBefore(nextSpinDate, dateComing) && timeRemaining > 0;
			setIsRollComing(timeIsComing);

			const timeIsRolling = new Date(currentTime);
			timeIsRolling.setMinutes(timeIsRolling.getMinutes() - MinusWaitResultRoll)
			const checkTimeIsRolling = isAfter(nextSpinDate, timeIsRolling) && timeRemaining <= 0;
			setIsRolling(checkTimeIsRolling)

			const timeIsRollEnd = new Date(currentTime);
			timeIsRollEnd.setMinutes(timeIsRollEnd.getMinutes() - 1 - MinusWaitResultRoll)
			const checkTimeIsRollEnd = isAfter(nextSpinDate, timeIsRollEnd) && !checkTimeIsRolling && timeRemaining <= 0;
			setIsRollEnd(checkTimeIsRollEnd);
			setIsEndRoll(checkTimeIsRollEnd);
			if (checkTimeIsRollEnd) {
				const timeEndRoll = calculateCountdown(timeIsRollEnd, nextSpinDate);
				setTimeRemainingEndRoll(timeEndRoll);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	function calculateCountdown(currentDate: Date, spinDate: Date): number {
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
		let hoursTarget = nextSpinDate.getHours();
		console.log(nextSpinDate.getMinutes());
		if (nextSpinDate.getMinutes() <= MinusWaitResultRoll) {
			minutesTarget = 0;
		} else if (nextSpinDate.getMinutes() <= 15 + MinusWaitResultRoll) {
			minutesTarget = 15;
		} else if (nextSpinDate.getMinutes() <= 30 + MinusWaitResultRoll) {
			minutesTarget = 30;
		} else if (nextSpinDate.getMinutes() <= 45 + MinusWaitResultRoll) {
			minutesTarget = 45;
		} else if (nextSpinDate.getMinutes() < 60) {
			minutesTarget = 0;
			hoursTarget += 1;
		}

		// debugger
		// return new Date(nextSpinDate);
		return new Date(nextSpinDate.getFullYear(), nextSpinDate.getMonth(), nextSpinDate.getDate(), hoursTarget, minutesTarget, 0, 0);
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
				timeRemainingEndRoll: timeRemainingEndRoll,
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
				setOpenModalProvablyFair,
				drawIdValue,
				setDrawIdValue,
				myTicketsCurrentLottery,
				dataLotteryBuyDrawId,
				resultRoll,
				currentLottery,
				isEndRoll,
				prevLottery,
				setIsEndRoll
			}
		)
	}, [isRollComing,
		dataLotteryBuyDrawId,
		resultRoll,
		timeRemaining,
		isRolling,
		isRollEnd,
		isWinPrize,
		openModalBuyTicket,
		openModalApprove,
		openModalBuyRunOut,
		openModalBuySuccess,
		openModalProvablyFair,
		drawIdValue,
		myTicketsCurrentLottery
	])
	return <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>
}