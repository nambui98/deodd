import { MinusBeforeSpin } from 'constants/index';
import { isAfter, isBefore } from "date-fns";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

interface LotteryContextType {
	isRollComing: boolean;
	dateSpin: Date | null;
	isRolling: boolean;
	isRollEnd: boolean;
	isWinPrize: boolean;
	openModalBuyTicket: boolean;
	setOpenModalBuyTicket: Dispatch<SetStateAction<boolean>>;
}

const LotteryContext = createContext<LotteryContextType>({
	isRollComing: false,
	dateSpin: null,
	isRolling: false,
	isRollEnd: false,
	isWinPrize: false,
	openModalBuyTicket: false,
	setOpenModalBuyTicket: () => { }
})

export const useLotteryContext = () => useContext(LotteryContext);

export const LotteryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isRollComing, setIsRollComing] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState(new Date());
	const [isRolling, setIsRolling] = useState<boolean>(false);
	const [isRollEnd, setIsRollEnd] = useState<boolean>(false);
	const [isWinPrize, setIsWinPrize] = useState<boolean>(false);
	const [openModalBuyTicket, setOpenModalBuyTicket] = useState<boolean>(true);

	let dateSpin = new Date();
	dateSpin.setHours(17);
	dateSpin.setMinutes(0);
	dateSpin.setSeconds(0);
	if (isAfter(new Date(), dateSpin)) {
		dateSpin.setDate(dateSpin.getDate() + 1);
	}

	dateSpin = new Date("2023-07-27T03:20:00Z");


	useEffect(() => {
		const dateComing = new Date();
		dateComing.setMinutes(dateComing.getMinutes() + MinusBeforeSpin);

		const timeIsComing = isBefore(dateSpin, dateComing) && isBefore(new Date(), dateSpin);
		setIsRollComing(timeIsComing);
	}, [currentTime, dateSpin])
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);
	const value: LotteryContextType = useMemo(() => {
		return (
			{
				isRollComing,
				dateSpin,
				isRolling,
				isRollEnd,
				isWinPrize,
				openModalBuyTicket,
				setOpenModalBuyTicket
			}
		)
	}, [isRollComing, isWinPrize, isRollEnd, dateSpin, isRolling, openModalBuyTicket, setOpenModalBuyTicket])
	return <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>
}