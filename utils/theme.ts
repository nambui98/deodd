import { red } from '@mui/material/colors';
import { PaletteColor, createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
export const lightTheme = responsiveFontSizes(createTheme({
	palette: {
		mode: "light",

		primary: {
			main: '#FFF',

		},

		secondary: {
			main: '#FC753F'
		},
		error: {
			main: red.A400

		},
		text: {
			primary: '#181536',
			secondary: '#FC753F'

		}


	},

	typography: {
		fontFamily: 'BeVietnamPro',

		fontSize: 14,
		subtitle1: {
			fontFamily: 'Electrofied',
			lineHeight: 1.2,
		},
		body1: {
			fontSize: "1.125rem",
			fontWeight: 400,
			lineHeight: 1.2,
		},
		button: {
			fontSize: 16,
		},

	},
	components: {
		MuiButton: {
			defaultProps: { variant: 'contained', size: 'large' },
			styleOverrides: {
				root: ({ ownerState }) => {
					let color = ownerState.color;
					return {
						border: `2px solid`,
						borderRadius: '8px',
						'&:disabled': {
							border: `2px solid`,
						},
						'&:hover': {
							backgroundColor: color != null && color != "inherit" ? lightTheme.palette[color].main : "inherit",
							border: `2px solid`,
							borderColor: color != null && color != "inherit" ? lightTheme.palette[color].main : "inherit",
							color: "#fff",
							transition: '.3s',
						},
					}
				},
			},
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						// border: `2px solid`,
						'&:hover': {
							// border: `2px solid`,

						}
					},
				},
			],
		},
		MuiIconButton: { defaultProps: { size: 'large' } },
		MuiLink: {
			defaultProps: {
				underline: 'none',
			},
			styleOverrides: {
				root: {
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
	// breakpoints: {
	// 	values: {
	// 		xs: 0,
	// 		sm: 768,
	// 		md: 900,
	// 		lg: 1200,
	// 		xl: 1536
	// 	}
	// },
	breakpoints: {
		values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1440 },
	},
}), {});
declare module '@mui/material/styles' {
	interface Palette {
		neutral: Palette['primary'];
		border: Palette['primary'];
	}

	// allow configuration using `createTheme`
	interface PaletteOptions {
		neutral?: PaletteOptions['primary'];
		border?: PaletteOptions['primary'];
	}
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		neutral: true;
		border: true;
	}
}

export const darkTheme = responsiveFontSizes(createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#fff",
			light: "#fff",
			'100': '#2A2D3E',
			'200': '#11131A',
			'300': '#161821',

		},
		secondary: {
			main: "#FEF156",
			"100": "#96A5C0",
			"200": "#A7ACB8",
			'300': "#2A2D3E",
			'400': "#FF5870",
			'500': '#E4EDF4',
			'600': '#F5F5FA',
			'700': '#677286',


		},
		neutral: {
			main: ' #2A2D3E',
			A100: '#48505F',
			A200:'#11131A'
		},
		border: {
			main: '#FEF156',
			dark: '#FEF156'

		},
		// neure:{},
		error: {
			main: red.A400,
			"100": '#FC753F',
			"200": '#ff6f61'
		},
		background: {
			default: "#161821",
			paper: "#2A2D3E",

		},
		text: {
			primary: "#fff",
			secondary: "#FEF156",
			disabled: '#96A5C0',
			// disabled: '#7071b3'
		},

	},
	// breakpoints: {
	// 	values: {
	// 		xs: 0,
	// 		sm: 768,
	// 		md: 900,
	// 		lg: 1200,
	// 		xl: 1536
	// 	}
	// },
	typography: {
		fontFamily: 'BeVietnamPro',
		fontSize: 14,
		// fontWeight: 400,
		subtitle1: {
			fontFamily: 'Electrofied',
			lineHeight: 1.2,
		},
		body1: {
			fontSize: "1.125rem",
			fontWeight: 400,
			lineHeight: 1.2,
		},
		body2: {
			fontSize: 14,
			fontWeight: 500
		},
		
		button: {
			fontSize: 16,
		},
		h1: {
			fontSize: 48,
			fontWeight: 500
		},
		h2: {
			fontSize: 24,
			fontWeight: 500
		},
		h3: {
			fontSize: 16,
			fontWeight: 500
		},
		h4: {
			fontSize: 18,
			fontWeight: 500
		},
		caption: {
			fontSize: 12,
			fontWeight: 500
		}
	},

	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarColor: "#6b6b6b #2b2b2b",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						backgroundColor: "transparent",
						width:'10px'
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: "#6b6b6b",
						minHeight: 20,
						// border: "3px solid #2b2b2b",
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: "#959595",
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: "#959595",
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "#959595",
					},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
						backgroundColor: "#2b2b2b",
					},
				},
			},
		},

		MuiButton: {
			defaultProps: { variant: 'contained', size: 'large' },
			styleOverrides: {
				root: ({ ownerState }) => {
					let color = ownerState.color;
					return {
						border: `2px solid`,
						borderRadius: '8px',

						'&:hover': {
							backgroundColor: color != null && color != "inherit" ? darkTheme.palette[color].main : "inherit",
							border: `2px solid`,
							borderColor: color != null && color != "inherit" ? darkTheme.palette[color].main : "inherit",
							color: darkTheme.palette.text.secondary,
							transition: '.3s',
						},
					}
				},
			},

			variants: [
				{
					props: { variant: 'outlined' },
					style: () => {
						return {
							border: `2px solid`,
							filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25))',
							'&:hover': {
								color: darkTheme.palette.background.default,
							}
						}

					}
				},
				{
					props: { variant: 'contained' },
					style: () => {
						return {
							backgroundColor: darkTheme.palette.neutral.main,
							boxShadow: 'none',
							border: `2px solid transparent`,
							color: darkTheme.palette.secondary.main,
							'svg': {
								stroke: darkTheme.palette.secondary.main
							},
							'&:hover': {
								borderColor: darkTheme.palette.border.dark,
								color: (darkTheme.palette.neutral as any).A200
								// color: darkTheme.palette.background.default,
							},
							'&:hover svg': {

								stroke: (darkTheme.palette.neutral as any).A200
							}

						}

					}
				},
			],
		},
		MuiIconButton: { defaultProps: { size: 'large' } },
		MuiLink: {
			defaultProps: {
				underline: 'none',
			},
			styleOverrides: {
				root: {
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1567,
			// xl: 1536
		},
	},
}), {});

