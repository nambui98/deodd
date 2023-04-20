import { Box, styled } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const Donut = (props: { data: [number, number] }) => {
    const data = {
        labels: ['TAIL', 'HEAD'],

        datasets: [
            {
        label: "Percent",
        data: props.data,
        cutout: 68,
        backgroundColor: ["#FC753F", "#FEF156"],
                spacing: 3,
                borderWidth: 0,
                borderRadius: 50,
                plugins: {
                    legend: {
            display: false,
          },
        },
            },
        ],
    };
    return <Doughnut options={{
        plugins: {
            legend: {
                display: false,
            },
        }
    }} data={data} />;
}

// const BoxCus = styled(Box)(({ percentMain }: { percentMain: number }) => ({
//     width: '100%',
//     margin: '0 auto',
//     animation: 'donutfade 1s',
//     fontSize: '16px',

//     '@keyframes donutfade': {
//         '0%': {
//             opacity: .2
//         },
//         '100%': {
//             opacity: 1
//         }
//     },
//     '.donut-ring': {
//         stroke: '#EBEBEB'
//     },
//     '.donut-segment': {
//         transformOrigin: 'center',
//         stroke: '#FF6200'
//     },

//     '.donut-segment-2': {
//         stroke: '#FC753F',
//         animation: 'donut1 3s'
//     },

//     '.donut-segment-3': {
//         stroke: '#FEF156',
//     },
//     '@keyframes donutfadelong': {
//         '0%': {
//             opacity: 0
//         },
//         '100%': {
//             opacity: 1
//         }
//     },
//     '@keyframes donut1': {
//         '0%': {
//             strokeDasharray: '0, 100'
//         },
//         '100%': {
//             strokeDasharray: `${percentMain}, ${100 - percentMain}`
//         }
//     },
//     '.donut-percent': {
//         fontSize: '0.5em',
//         lineHeight: 1,
//         transform: 'translateY(0.5em)',
//         fontWeight: 'bold',

//         animation: 'donutfadelong 1s'
//     },

//     '.donut-data': {
//         fontSize: '0.12em',
//         lineHeight: 1,
//         transform: 'translateY(0.5em)',
//         textAlign: 'center',
//         textAnchor: 'middle',
//         color: '#666',
//         fill: '#666',
//         animation: 'donutfadelong 1s',
//     }

// }))