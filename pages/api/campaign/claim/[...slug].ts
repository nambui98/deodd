import { NextApiRequest, NextApiResponse } from "next/types"
import allStar from '../../../../data/merkle-allstar.json'
import ref from '../../../../data/merkle-ref.json'
import nft from '../../../../data/merkle-nft.json'
import { BigNumber, ethers } from "ethers"
type ResType = {
    data: any
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { slug } = req.query

    if (slug && slug.length > 0) {
        const [wallet, type] = slug as string[];
        // if (type === 'TESTNET') {
        //     res.status(200).json(slug);
        // } else if (type === 'TOP_REF') {
        //     res.status(200).json(slug);
        // }
        let myData: {
            amount: string,
            proof: string[]
        } | undefined;
        ;
        if (type === 'TESTNET') {
            myData = (allStar as any).merkleData.claimData[wallet.toLowerCase()]
            if (myData) {
                myData.amount = ethers.utils.formatEther(BigNumber.from(myData?.amount));
            }
        } else if (type === 'TOP_REF') {
            myData = (ref as any).merkleData.claimData[wallet.toLowerCase()]
            if (myData) {
                myData.amount = ethers.utils.formatEther(BigNumber.from(myData?.amount));
            }
        } else if (type === 'NFT_AIRDROP') {
            myData = (nft as any).merkleData.claimData[wallet.toLowerCase()]
            if (myData) {
                myData.amount = parseFloat(myData?.amount ?? '0').toString();
            }
        }
        return res.status(200).json({
            ...myData,
        })


    } else {
        res.status(400).json({ error: 'Error' })
    }

    // res.status(200).json(data);
    //   res.end(`Post: ${slug?.join(', ')}`)
}