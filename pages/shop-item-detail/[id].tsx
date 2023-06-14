import ListingItem, { ListingItemType } from '@/templates/shop/components/ListingItem';
import ProcessingBuy from '@/templates/shop/components/ProcessingBuy';
import ShareButton from '@/templates/shop/components/ShareButton';
import { Utils } from '@/utils/index';
import { Box, Container, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Meta } from 'components/common/Meta';
import Price from 'components/common/Price';
import { ButtonLoading } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useSiteContext } from 'contexts/SiteContext';
import { BigNumber } from 'ethers';
import { DeoddService } from 'libs/apis';
import { deoddNFTContract } from 'libs/contract';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BagTickIcon, EyeIcon, RightIcon, USDTIcon } from 'utils/Icons';
import { Convert } from 'utils/convert';
import { Format } from 'utils/format';

function ShopItemDetail() {
  const router = useRouter();
  const { setIsSuccess, setTitleSuccess } = useSiteContext();
  const [item, setItem] = useState<ListingItemType | undefined>()
  const [itemsSuggestion, setItemsSuggestion] = useState<ListingItemType[] | undefined>()
  const [isShowBuy, setIsShowBuy] = useState<boolean>(false);

  const { refetch: getDetailShopItem, isFetching, isLoading } = useQuery({
    queryKey: ["getDetailShopItem"],
    enabled: false,
    queryFn: () => DeoddService.getShopDetailItem(router.query.id?.toString() ?? ''),
    onSuccess(data) {
      if (data && data.data) {
        setItem(data.data)
      }
    },
    select: (data: any) => {
      if (data.status === 200) {
        return data.data;
      } else {
        return undefined
      }
    },
  });
  const { refetch: getSuggestion } = useQuery({
    queryKey: ["getSuggestion"],

    enabled: false,
    queryFn: () => DeoddService.getSuggestion(4),
    onSuccess(data) {
      if (data && data.data) {
        setItemsSuggestion(data.data)
      }
    },
    select: (data: any) => {
      if (data.status === 200) {
        return data.data;
      } else {
        return undefined
      }
    },
  });
  useEffect(() => {
    if (router.query.id) {
      getDetailShopItem();
      getSuggestion();
      const test = document.getElementById('main-top')
      test?.scrollIntoView({ behavior: "smooth" })
    }
  }, [getDetailShopItem, getSuggestion, router.query.id])

  const handleCopy = () => {
    navigator?.clipboard.writeText(deoddNFTContract.address);
    setTitleSuccess("Copy to clipboard");
    setIsSuccess(true);
  }

  const isMediumScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  return (
    <Container sx={{ mt: 5 }}>

      <Meta title={'DeODD #' + item?.token_id} description='Own your NFTs and participate in a decentralized coin flip and lottery mechanism by using your BNB with DeODD.' />

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={4} order={1}>
          <Box p={3} width={1}>
            <img width="100%" height={'auto'} src={item?.image_link} alt="Image" />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={2}>
          <Stack gap={{ xs: 2, md: 3 }}>

            <Typography component={'span'} variant='body1' fontSize={{ xs: 14, md: 16 }} fontWeight={{ xs: 500, md: 600 }} color="secondary.main">deODD NFT 1ST Collection</Typography>
            <Typography fontSize={{ xs: 24, md: 40 }} fontWeight={700} lineHeight={{ xs: '32px', md: '50.6px' }}>deODD #{item?.token_id}</Typography>
            <Stack direction={'row'} gap={3} >
              <Stack gap={1}>
                <Typography variant='body2'>
                  Contract Address
                </Typography>
                <Typography variant='body2'>
                  Token ID
                </Typography>
                <Typography variant='body2'>
                  NFT Type
                </Typography>
                <Typography variant='body2'>
                  Chain
                </Typography>
              </Stack>
              <Stack gap={1}>

                <Typography color="secondary.main" variant='body2' sx={{ cursor: 'pointer' }} onClick={handleCopy}>
                  {Convert.convertWalletAddress(deoddNFTContract.address, 4, 5)}
                </Typography>
                <Typography color="secondary.main" variant='body2'>
                  {item?.token_id}
                </Typography>
                <Typography variant='body2'>
                  {Utils.getTypeNFT(item?.type) ?? '---'}
                </Typography>
                <Typography variant='body2'>
                  BSC
                </Typography>
              </Stack>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={'flex-end'}>

              <Price typographyProps={{ fontSize: 24, fontWeight: 700 }}
                value={item?.price ?? 0}
                token={<USDTIcon width={24} height={24} fill="#50ae94" />} />
              {/* <Typography variant='body1' color="dark.60" fontWeight={600}>$124,124.00</Typography> */}
            </Stack>
            <ButtonLoading
              loading={isFetching || isLoading}
              onClick={() => {
                if (item?.status === "LISTING") {
                  setIsShowBuy(true)
                }
              }}
              sx={{
                fontWeight: 400,
                py: 2,
                borderColor: 'secondary.main',
                svg: { transition: '.3s all', fill: Colors.secondaryDark, stroke: 'none' },
                color: 'secondary.main',
                textTransform: 'none',
                '&:hover': {
                  borderWidth: 1,
                  borderColor: 'secondary.main',
                  bgcolor: 'secondary.main',
                  svg: { fill: Colors.bg80, stroke: 'none' }
                }
              }}>
              {
                item?.status === "LISTING" ?
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    {(!isFetching || isLoading) && (
                      <BagTickIcon />
                    )}
                    Buy now
                  </Stack>
                  : <Typography>Sold out</Typography>

              }


            </ButtonLoading>
          </Stack>
        </Grid>
        <Grid item xs={12} order={{ xs: 0, md: 3 }} md={4}>
          <Stack px={3} direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
            <EyeIcon />
            <Typography ml={1} variant="body2" fontWeight={500}>{item?.view_amount}</Typography>
            <Box ml={2}>
              <ShareButton title={'DeODD #' + item?.token_id} description='Own your NFTs and participate in a decentralized coin flip and lottery mechanism by using your BNB with DeODD.' />
            </Box>
          </Stack>
        </Grid>

      </Grid>
      <Divider sx={{ borderColor: 'secondary.300', my: { xs: 3, md: 5 } }} />
      <Stack direction={'row'} mb={3} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant='h5' flex={1} fontSize={{ xs: 16, md: 24 }} fontWeight={{ xs: 600, md: 700 }}>More from this collection</Typography>
        <Stack component={Link} flex={1} href="/shop" direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
          <Typography variant='body2' fontWeight={400} color="secondary.main">View Collection </Typography>
          <RightIcon stroke={Colors.secondaryDark} />
        </Stack>
      </Stack>
      <Box overflow={{ md: 'hidden', xs: 'auto' }} >
        <Grid container wrap={isMediumScreen ? 'nowrap' : 'wrap'} spacing={4} pb={{ xs: 1, md: 0 }}>
          {
            itemsSuggestion?.map((item, index) =>
              <Grid item key={item.token_id} xs={6} md={3}>
                <ListingItem item={item} />
              </Grid>
            )
          }
        </Grid>
      </Box>
      <ProcessingBuy item={item} refresh={() => getDetailShopItem()} isShowBuy={isShowBuy} setIsShowBuy={setIsShowBuy} />
    </Container >
  )
}

export default ShopItemDetail;