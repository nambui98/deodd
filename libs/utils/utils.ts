import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export const convertWalletAddress = (
	walletAddress: string,
	start: number,
	end: number,
	split: string = '...'
) => {
	return walletAddress.slice(0, start) + split + walletAddress.slice(-end);
};

export const formatMoney = (number: string, fixed?: number) => {
	var newValue = number;
	if (newValue[newValue.length - 1] === '.') {
		newValue = parseFloat(newValue).toFixed(1);
	}
	return parseFloat(newValue).toLocaleString('en-US', {
		style: undefined,
		currency: undefined,
		maximumFractionDigits: fixed || 5,
	});
};


export const convertTimeStamp = (time: number) => {
	TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
	return timeAgo.format(time * 1000)
}