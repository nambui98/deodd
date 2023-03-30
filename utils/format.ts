import { BigNumber, ethers } from "ethers";

export const Format = {
    formatMoney: (number: string, fixed?: number) => {
        var newValue = number;
        if (newValue[newValue.length - 1] === '.') {
            newValue = parseFloat(newValue).toFixed(1);
        }
        return parseFloat(newValue).toLocaleString('en-US', {
            style: undefined,
            currency: undefined,
            maximumFractionDigits: fixed || 5,
        });
    },
    formatMoneyFromBigNumberEther: (number: BigNumber, fixed?: number) => {
        var newValue = ethers.utils.formatUnits(number);
        if (newValue[newValue.length - 1] === '.') {
            newValue = parseFloat(newValue).toFixed(1);
        }
        return parseFloat(newValue).toLocaleString('en-US', {
            style: undefined,
            currency: undefined,
            maximumFractionDigits: fixed || 5,
        });
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
} 