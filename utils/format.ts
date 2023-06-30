import { BigNumber, ethers } from "ethers";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const Format = {
    formatMoney: (value: string | number, fixed?: number) => {
        var newValue = parseFloat(value.toString());
        // if (newValue[newValue.length - 1] === '.') {
        //     newValue = parseFloat(newValue).toFixed(1);
        // }

        return new Intl.NumberFormat("en", { maximumFractionDigits: fixed ?? 5 }).format(newValue);
        // return parseFloat(newValue).toLocaleString('en-US', {
        //     style: undefined,
        //     currency: undefined,
        //     maximumFractionDigits: fixed || 5,
        // });
    },
    formatMoneyFromBigNumberEther: (number: BigNumber | undefined, fixed?: number) => {
        if (number !== undefined) {
            var newValue = parseFloat(ethers.utils.formatUnits(number.toString()));
            // if (newValue[newValue.length - 1] === '.') {
            //     newValue = parseFloat(newValue).toFixed(1);
            // }

            return new Intl.NumberFormat("en", { maximumFractionDigits: fixed ?? 5 }).format(newValue);
            // // return parseFloat(newValue).toLocaleString('en-US', {
            //     return parseFloat(newValue).toLocaleString('en-US', {
            //         style: undefined,
            //         currency: undefined,
            //         maximumFractionDigits: fixed || 5,
            //     });

        }
        return 0;
    },
    formatMoneyFromBigNumber: (number: BigNumber, fixed?: number) => {

        var newValue = parseFloat((number.toString()));
        // if (newValue[newValue.length - 1] === '.') {
        //     newValue = parseFloat(newValue).toFixed(1);
        // }

        return new Intl.NumberFormat("en", { maximumFractionDigits: fixed ?? 5 }).format(newValue);
        // return parseFloat(newValue).toLocaleString('en-US', {
        //     style: undefined,
        //     currency: undefined,
        //     maximumFractionDigits: fixed || 5,
        // });
    },

    formatDateTime: (date: string, type = 'dd/MM/yyyy') => format(new Date(date), type),

    formatDateTimeAlt: (date: string, timezone: string, type = 'HH:mm zzz MMMM dd, yyyy') => {
        if (date) {
            return formatInTimeZone(date, timezone, type)
        }
    },
}
