import React from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';

interface IProps {
    endDate: string
    sxTitle?: any
    sxSubTitle?: any
}

const Countdown: React.FC<IProps> = ({ endDate, sxTitle, sxSubTitle }) => {

    const end = Date.parse(endDate);
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    const _day = _hour * 24;

    const [dayText, setDayText] = React.useState('00');
    const [hrText, setHrText] = React.useState('00');
    const [minText, setMinText] = React.useState('00');
    const [secText, setSecText] = React.useState('00');
    const isMobile = useMediaQuery('(max-width: 767px)')

    React.useEffect(() => {
        const counter = setInterval(() => {
            const distance = end - Date.now();
            if (distance < 0) {
                clearInterval(counter);
                setDayText('00');
                setHrText('00');
                setMinText('00');
                setSecText('00');
            } else {
                let days = Math.floor(distance / _day);
                let hrs = Math.floor((distance % _day) / _hour);
                let mins = Math.floor((distance % _hour) / _minute);
                let secs = Math.floor((distance % _minute) / _second);
                setDayText(days < 0 ? '' : days < 10 ? `0${days}` : `${days}`);
                setHrText(hrs < 0 ? '' : hrs < 10 ? `0${hrs}` : `${hrs}`);
                setMinText(mins < 0 ? '' : mins < 10 ? `0${mins}` : `${mins}`);
                setSecText(secs < 0 ? '' : secs < 10 ? `0${secs}` : `${secs}`);
            }
        }, 1000);
        return () => clearInterval(counter);
    }, []);
    return (
        <Stack direction={'row'}  >
            {[
                { count: dayText, title: 'd ' },
                { count: hrText, title: 'h ' },
                { count: minText, title: 'm ' },
                { count: secText, title: 's ' },
            ].map(({ count, title }) => (
                <Stack key={title} width={70} alignItems={'center'}>
                    <Typography fontSize={32} fontWeight={700} color={'secondary.main'}>
                        {count}
                    </Typography>
                    <Typography width={10} color={'dark.60'}>
                        {title}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );

};

export default Countdown;
