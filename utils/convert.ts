import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


export const Convert = {
    convertWalletAddress: (
        walletAddress: string,
        start: number,
        end: number,
        split: string = '...'
    ) => {
        return walletAddress?.slice(0, start) + split + walletAddress?.slice(-end);
    },

    convertTimeStamp: (time: number) => {
        TimeAgo.addLocale(en)
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(time * 1000)
    },
    convertData: (data: any[]) => {
        const newData = data.map((item: any) => {
            const objItem: any = {};
            const keys = Object.keys(item);
            for (let i = 0; i < keys.length; i++) {
                let value;
                if (isNaN(parseInt(keys[i]))) {
                    if (typeof item[keys[i]] !== "string") {
                        value = parseInt(item[keys[i]]._hex);
                    } else {
                        value = item[keys[i]];
                    }
                    objItem[keys[i]] = value;
                }
            }
            return objItem;
        })
        debugger
        return newData;
    }
}