import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
export const darkTheme = responsiveFontSizes(createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#556cd6",
			light: "#f1f5f9"
		},
		secondary: {
			main: "#FEF156",
		},
		error: {
			main: red.A400
		},
		background: {
			default: "#1C1B3E"
		},
		text: {
			primary: "#fff",
			secondary: "#FEF156",


		}
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
								color: darkTheme.palette.text.secondary,
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
			sm: 768,
			md: 900,
			lg: 1200,
			xl: 1536
		},
	},
}), {});

