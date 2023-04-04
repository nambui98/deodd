import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import React, { useEffect, useState } from 'react'

function useReferral() {
    const [ckReferral, setCkReferral] = useState<boolean>(false)
    const { walletAddress } = useWalletContext();
    useEffect(() => {
        let ck = DeoddService.checkUserReferral(walletAddress).then((res) => {

            debugger
        });
    }, [])



    return { ckReferral }
}

export default useReferral