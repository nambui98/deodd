import { Box, Container, Stack } from "@mui/material";
import { ButtonSecondRemex } from "components/ui/button";
import MyImage from "components/ui/image";
import { UserInfo } from "components/ui/userInfo";
import { useSiteContext } from "contexts/SiteContext";
import Image from "next/image";
import Link from "next/link";
import { VolumeTurnOffImage, VolumnImage } from "utils/Images";

type Props = {}

function Header({ }: Props) {
  const { turnOffAudio, isTurnOffAudio } = useSiteContext();


  return <Container sx={{ containerType: "inline-size" }}>
    <Stack height={{ md: 112, xs: 72 }} position={'relative'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <ButtonSecondRemex
        aria-label="turn off, on audio"
        onClick={() => {
          turnOffAudio();
        }}
        sx={{
          padding: { xs: .5, md: 1.5 }, minWidth: 0, borderRadius: 2,
          img: {
            transition: '.3s all'
          },
          svg: { stroke: 'none' }, '&:hover': {
            backgroundColor: 'neutral.A100',
            borderColor: 'transparent',
            '& img': {
              transform: 'scale(1.1)',
            }
          }
        }}
      >
        {
          isTurnOffAudio ? <MyImage src={VolumeTurnOffImage} alt="volume-off-icon" width={24} height={24} /> : <MyImage src={VolumnImage} alt="volume-on-icon" width={24} height={24} />
        }
      </ButtonSecondRemex>
      <Box position={'absolute'} left={'50%'} top={'50%'} sx={{ transform: 'translate(-50%, -50%)' }} >
        <Link href={"/"}>
          <Box position={'relative'} width={{ md: 105.19, xs: 65.5 }} height={{ md: 64, xs: 40 }} >

            <Image fill style={{ objectFit: "contain" }} alt="" src={`/assets/logos/logo.svg`} />
          </Box>
        </Link>
      </Box>

      <UserInfo />
    </Stack>
  </Container>
}

export default Header


