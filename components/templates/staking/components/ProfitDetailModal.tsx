import { useEffect, useState } from "react";
import MyModal from "components/common/Modal";
import { Colors, DefaultRewardPool, SharePerNFT } from "constants/index";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import { ButtonFourth } from "components/ui/button";
import { BnbIcon, InfoCircle2Icon } from "utils/Icons";
import { EnumNFT, TypeDataNFT, TypeNFT } from "libs/types";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import { Utils } from "@/utils/index";
import { Format } from "utils/format";
import { BigNumber, ethers } from "ethers";
import Image from 'next/image'
import FormatNumber from "components/common/FormatNumber";
import { getPathAvatarNFT } from "utils/checkAvatar";
import MyImage from "components/ui/image";

type StakingCalculatorType = {
    open: boolean;
    setOpen: Function;
    nftCards?: TypeDataNFT | null,
}

function ProfitDetailModal({ open, setOpen, nftCards }: StakingCalculatorType) {
    return (
        <MyModal
            open={open}
            setOpen={setOpen}
            haveIconClosed
            iconProps={{ width: 24, color: Colors.secondary }}
            sx={{
                backgroundColor: "primary.200",
                maxWidth: 544,
            }}
        >
            <Typography variant="body2" sx={{ mb: 2 }} color="secondary.100">Profit detail</Typography>
            <Stack direction={'row'} justifyContent={'center'} gap={4}>
                {
                    nftCards?.data.map((element: any, index: number) => <Stack key={index} alignItems={'center'}>
                        <MyImage src={getPathAvatarNFT(element.type)} width={24} height={24} alt={''} />
                        <Stack sx={{ flexDirection: "row", gap: 1, mt: .5 }}>
                            <Typography variant="body2">{
                                Format.formatMoney(element.estProfit)
                            }</Typography>

                            <BnbIcon width={20} color={Colors.primaryDark} />
                        </Stack>
                    </Stack>
                    )
                }
            </Stack>
        </MyModal>
    );
}

export default ProfitDetailModal;
