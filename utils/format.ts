import { BigNumber, ethers } from "ethers";
import { format } from "date-fns";

export const Format = {
    formatMoney: (value: string | number, fixed?: number) => {
        var newValue = value.toString();
        if (newValue[newValue.length - 1] === '.') {
            newValue = parseFloat(newValue).toFixed(1);
        }
        return parseFloat(newValue).toLocaleString('en-US', {
            style: undefined,
            currency: undefined,
            maximumFractionDigits: fixed || 5,
        });
    },
    formatMoneyFromBigNumberEther: (number: BigNumber | undefined, fixed?: number) => {
        if (number !== undefined) {
            var newValue = ethers.utils.formatUnits(number.toString());
            if (newValue[newValue.length - 1] === '.') {
                newValue = parseFloat(newValue).toFixed(1);
            }
            return parseFloat(newValue).toLocaleString('en-US', {
                style: undefined,
                currency: undefined,
                maximumFractionDigits: fixed || 5,
            });

        }
        return 0;
    },
    formatMoneyFromBigNumber: (number: BigNumber, fixed?: number) => {
        var newValue = number.toNumber().toString();
        if (newValue[newValue.length - 1] === '.') {
            newValue = parseFloat(newValue).toFixed(1);
        }
        return parseFloat(newValue).toLocaleString('en-US', {
            style: undefined,
            currency: undefined,
            maximumFractionDigits: fixed || 5,
        });
    },


    formatDateTime: (date: string, type = 'dd/MM/yyyy') => format(new Date(date), type),
} 