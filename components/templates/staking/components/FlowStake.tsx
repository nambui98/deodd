import { ButtonLoading } from 'components/ui/button';
import React, { useState } from 'react'
import ApproveModal from './ApproveModal';
import { useContractRead, useContractWrite } from 'wagmi';
import { dusdContract, deoddShopContract, deoddNFTContract, nftHolderContract } from 'libs/contract';
import { BigNumber, ethers } from 'ethers';
import { TypeNFT } from 'libs/types';
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext';

type Props = {
    nftSelected?: TypeNFT,
    handleSetNftSelected: Function
}

function FlowStake({ nftSelected, handleSetNftSelected }: Props) {
    const { setIsError, setTitleError } = useSiteContext();
    const { walletAddress } = useWalletContext();
    const [isApproveModalOpened, setIsApproveModalOpened] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const { writeAsync: approve, isLoading, isIdle } = useContractWrite({
        address: deoddNFTContract.address,
        mode: 'recklesslyUnprepared',
        abi: deoddNFTContract.abi,
        functionName: 'approve',
        args: [nftHolderContract.address, BigNumber.from(nftSelected?.id ?? 0)]
    })
    const { writeAsync: stake, isLoading: isLoadingStake, } = useContractWrite({
        address: nftHolderContract.address,
        mode: 'recklesslyUnprepared',
        abi: nftHolderContract.abi,
        functionName: 'stakeNFT',
        args: [BigNumber.from(nftSelected?.id ?? 0)]
    })
    const { refetch: getAllowance, isLoading: isLoadingGetAllowance } = useContractRead({
        address: deoddNFTContract.address,
        abi: deoddNFTContract.abi,
        functionName: 'getApproved',
        args: [BigNumber.from(nftSelected?.id ?? 0)],
        // enabled: false,
        onSuccess(data) {
            if (data === nftHolderContract.address) {
                setIsApproved(true);
            } else {
                setIsApproved(false);
            }
        },
    })
    const handleApprove = () => {
        approve?.()
            .then(resWrite => {
                return resWrite.wait();
            })
            .then((res) => {
                getAllowance();
            })
            .catch(error => {
                setIsError(true);
                setTitleError(error.reason || 'Something went wrong');
            })
    }
    const handleStake = () => {
        stake?.()
            .then(resWrite => {
                return resWrite.wait();
            })
            .then((res) => {
                setIsApproveModalOpened(true);
                handleSetNftSelected(null);
            })
            .catch(error => {
                debugger
                setIsError(true);
                setTitleError(error.reason || 'Something went wrong');
            })
    }
    return (
        <>
            {
                isApproved ?
                    <ButtonLoading
                        sx={{
                            py: 2,
                            px: 5,
                            width: 'auto',
                            fontSize: "1rem",
                            fontWeight: 600,
                            lineHeight: "1.375rem",
                            backgroundColor: "primary.300"
                        }}
                        loading={isLoadingStake}
                        onClick={() => {
                            handleStake()
                        }}
                    >
                        Stake
                    </ButtonLoading>
                    :
                    <ButtonLoading
                        sx={{
                            py: 2,
                            px: 5,
                            width: 'auto',
                            fontSize: "1rem",
                            fontWeight: 600,
                            lineHeight: "1.375rem",
                            backgroundColor: "primary.300"
                        }}
                        loading={isLoading || isLoadingGetAllowance}
                        onClick={() => {
                            handleApprove();
                        }}
                    >
                        Approve
                    </ButtonLoading>
            }

            <ApproveModal open={isApproveModalOpened} setOpen={setIsApproveModalOpened} />

        </>

    )
}

export default FlowStake