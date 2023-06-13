import ListingItem, { ListingItemType } from '@/templates/shop/components/ListingItem';
import ShareButton from '@/templates/shop/components/ShareButton';
import { Box, Container, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import MyModal from 'components/common/Modal';
import Price from 'components/common/Price';
import { ButtonLoading } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useSiteContext } from 'contexts/SiteContext';
import { BigNumber, ethers } from 'ethers';
import { DeoddService } from 'libs/apis';
import { deoddShopContract, dusdContract } from 'libs/contract';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BagTickIcon, EyeIcon, RightIcon, USDTIcon } from 'utils/Icons';
import { Format } from 'utils/format';
import { erc20ABI, useContractWrite } from 'wagmi';

function ShopItemDetail() {
  const router = useRouter();
  const [item, setItem] = useState<ListingItemType | undefined>()
  const [itemsSuggestion, setItemsSuggestion] = useState<ListingItemType[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isShowBuy, setIsShowBuy] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { setIsError, setTitleError } = useSiteContext();

  const { writeAsync: buyNFT } = useContractWrite({
    address: deoddShopContract.address,
    mode: 'recklesslyUnprepared',
    abi: deoddShopContract.abi,
    functionName: 'purchaseItemByToken',
    args: [BigNumber.from(item?.token_id ?? 0)]
  })
  const { writeAsync: approve } = useContractWrite({
    address: dusdContract.address,
    mode: 'recklesslyUnprepared',
    abi: erc20ABI,
    functionName: 'approve',
    args: [deoddShopContract.address, ethers.utils.parseUnits('30')
      // BigNumber.from(item?.price ?? 0)
    ]
  })
  const { refetch: getDetailShopItem } = useQuery({
    queryKey: ["getDetailShopItem"],
    // enabled: router.query.id ? true : false,
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
    }
  }, [router.query.id])

  const handleBuyNFT = () => {
    setIsLoading(true);
    buyNFT?.()
      .then(resWrite => {
        return resWrite.wait();
      })
      .then((res) => {
        setIsApproved(false);
        setIsLoading(false);
        setIsSuccess(true);
        getDetailShopItem();
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
        setTitleError(error.reason || 'Something went wrong. Please try again!');
      })
  }
  const handleApprove = () => {
    setIsLoading(true);
    approve?.()
      .then(resWrite => {
        return resWrite.wait();
      })
      .then((res) => {
        setIsApproved(true);
        setIsShowBuy(false);
        setIsLoading(false);
      })
      .catch(error => {
        setIsApproved(false);
        setIsLoading(false);
        setIsError(true);
        setTitleError(error.reason || 'Something went wrong. Please try again!');
      })
  }

  const isMediumScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={4} order={1}>
          <Box p={3} width={1}>
            <img width="100%" src={item?.image_link} alt="Image" />
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

                <Typography color="secondary.main" variant='body2'>
                  0x306b...f949
                </Typography>
                <Typography color="secondary.main" variant='body2'>
                  {item?.token_id}
                </Typography>
                <Typography variant='body2'>
                  {item?.type ?? '---'}
                </Typography>
                <Typography variant='body2'>
                  BSC
                </Typography>
              </Stack>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={'flex-end'}>

              <Price typographyProps={{ fontSize: 24, fontWeight: 700 }}
                value={Format.formatMoneyFromBigNumberEther(BigNumber.from(item?.price.toString() ?? 0))}
                token={<USDTIcon width={24} height={24} fill="#50ae94" />} />
              {/* <Typography variant='body1' color="dark.60" fontWeight={600}>$124,124.00</Typography> */}
            </Stack>
            <ButtonLoading
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
                    <BagTickIcon />
                    Buy now
                  </Stack>
                  : 'Sold out'
              }


            </ButtonLoading>
          </Stack>
        </Grid>
        <Grid item xs={12} order={{ xs: 0, md: 3 }} md={4}>
          <Stack px={3} direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
            <EyeIcon />
            <Typography ml={1} variant="body2" fontWeight={500}>{item?.view_amount}</Typography>
            <Box ml={2}>
              <ShareButton />
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
      <MyModal open={isShowBuy} sx={{ width: "min(100vw - 16px, 544px)", boxShadow: '0px 2px 16px rgba(254, 241, 86, 0.5)' }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => { setIsShowBuy(false) }}>

        <Typography textAlign={'center'} variant='h5' fontWeight={700}>Approve token</Typography>
        <Grid container spacing={2} pt={3}>
          <Grid item xs={3} >
            <Box p={1}>
              <img src={item?.image_link} alt="" width="100%" />
            </Box>
          </Grid>
          <Grid item xs={9}>

            <Typography variant='body1' fontWeight={600}>DeODD #{item?.token_id}</Typography>

            <Typography variant="caption" mt={.5} color="secondary.main" fontWeight={400}>DeODD NFT 1ST Collection</Typography>
            <Grid container pt={1}>
              <Grid item xs={6}>
                <Typography variant='body2' fontWeight={400}>Price</Typography>
              </Grid>
              <Grid item xs={6}>
                <Stack gap={1} alignItems={'flex-end'}>
                  <Price
                    token={<USDTIcon width={24} height={24} fill="#50ae94" />}
                    value={Format.formatMoneyFromBigNumberEther(BigNumber.from(item?.price.toString() ?? 0))} typographyProps={{ variant: 'body1', fontWeight: 600 }}
                  />
                </Stack>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} >
            <ButtonLoading onClick={handleApprove} loading={isLoading} sx={{ mt: 2, py: 2, textTransform: 'none' }}>
              Approve
            </ButtonLoading>
            <ButtonLoading onClick={() => setIsShowBuy(false)} sx={{ py: 2, mt: 2, textTransform: 'none', border: 1, borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', border: 1, borderColor: 'white' } }}>
              Cancel
            </ButtonLoading>

          </Grid>
        </Grid>

      </MyModal>
      <MyModal open={isApproved} sx={{ width: "min(100vw - 16px, 352px)", boxShadow: '0px 2px 16px rgba(254, 241, 86, 0.5)' }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => { setIsApproved(false) }}>

        <Typography textAlign={'center'} variant='h5' fontWeight={700}>Checkout</Typography>
        <Grid container spacing={2} pt={3}>
          <Grid item xs={3} >
            <Box p={1}>
              <img src={item?.image_link} alt="" width="100%" />
            </Box>
          </Grid>
          <Grid item xs={9}>

            <Typography variant='body1' fontWeight={600}>DeODD #{item?.token_id}</Typography>

            <Typography variant="caption" mt={.5} color="secondary.main" fontWeight={400}>DeODD NFT 1ST Collection</Typography>
            <Grid container pt={1}>
              <Grid item xs={6}>
                <Typography variant='body2' fontWeight={400}>Price</Typography>
              </Grid>
              <Grid item xs={6}>
                <Stack gap={1} alignItems={'flex-end'}>
                  <Price
                    token={<USDTIcon width={24} height={24} fill="#50ae94" />}
                    value={Format.formatMoneyFromBigNumberEther(BigNumber.from(item?.price.toString() ?? 0))} typographyProps={{ variant: 'body1', fontWeight: 600 }}
                  />
                </Stack>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} >
            <ButtonLoading onClick={handleBuyNFT} loading={isLoading} sx={{
              mt: 2, py: 2, textTransform: 'none',
              borderColor: 'secondary.main',
              color: 'secondary.main',
              svg: { transition: '.3s all', fill: Colors.secondaryDark, stroke: 'none' },
              '&:hover': {
                bgcolor: 'secondary.main',
                borderWidth: 1,
                borderColor: "secondary.main",
                svg: { fill: Colors.bg80, stroke: 'none' }
              }
            }}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                {
                  !isLoading &&

                  <BagTickIcon />
                }
                Buy now
              </Stack>

            </ButtonLoading>
            <ButtonLoading onClick={() => setIsApproved(false)} sx={{ py: 2, mt: 2, textTransform: 'none', border: 1, borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', border: 1, borderColor: 'white' } }}>
              Cancel
            </ButtonLoading>

          </Grid>
        </Grid>

      </MyModal>
      <MyModal open={isSuccess} sx={{ width: "min(100vw - 16px, 352px)", boxShadow: '0px 2px 16px rgba(254, 241, 86, 0.5)' }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => { setIsSuccess(false) }}>

        <Typography textAlign={'center'} variant='h5' fontWeight={700}>Payment success</Typography>
        <Stack mt={3} alignItems={'center'}>
          <Box width={96}>

            <img src={item?.image_link} alt="" width="100%" />
          </Box>

          <Typography variant='body1' fontWeight={600} mt={3}>DeODD #{item?.token_id}</Typography>

          <Typography mt={1} variant="caption" color="secondary.main" fontWeight={400}>DeODD NFT 1ST Collection</Typography>
        </Stack>
        <ButtonLoading LinkComponent={Link} href={'/assets'} sx={{
          mt: 2, py: 2, textTransform: 'none',
        }}>
          View in Assets
        </ButtonLoading>
        <ButtonLoading onClick={() => setIsSuccess(false)} sx={{ py: 2, mt: 2, textTransform: 'none', border: 1, borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', border: 1, borderColor: 'white' } }}>
          Close
        </ButtonLoading>


      </MyModal>
    </Container >
  )
}

export default ShopItemDetail;