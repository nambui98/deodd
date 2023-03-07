import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


export const Convert = {
    convertEthTo: () => {
        return 1;
    },
    convertWalletAddress: (
        walletAddress: string,
        start: number,
        end: number,
        split: string = '...'
    ) => {
        return walletAddress.slice(0, start) + split + walletAddress.slice(-end);
    },

    convertTimeStamp: (time: number) => {
        TimeAgo.addLocale(en)
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(time * 1000)
    }
}