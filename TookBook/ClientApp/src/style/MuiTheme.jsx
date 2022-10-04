import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const defaultTheme = createTheme();

// Overrides the default MUI-theme. View the documentation for usage. Can be used to change default styling of components/palettes/typography/etc.

// Breakpoints in pixels
let theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,	//600
			md: 900,	//900
			lg: 1200,	//1200
			xl: 1536,
		},
	},
	/**		
	 * 	Add more custom colours to the theme by using the following format:
		nameofcolourhere: defaultTheme.palette.augmentColor({
		color: { main: "#colourinhexhere" },
		name: "nameofcolourhere" 
			*/
	palette: {
		primary: {
			main: "#6D597A"
		},
		secondary: {
			main: "#B56576"
		},
		error: {
			main: "#E59999"
		},
		success: {
			main: "#72AB9A"
		},
		teritary: defaultTheme.palette.augmentColor({
			color: { main: "#FFE7C4" },
			name: "teritary"
		}),
		backgroundColour: defaultTheme.palette.augmentColor({
			color: { main: "#faf0e6" },
			name: "backgroundColour"
		}),
		dark: defaultTheme.palette.augmentColor({
			color: { main: "#272b0b" },
			name: "dark"
		})

	},
	/** Section to add custom fonts, requires font to be imported in index.html first. Use fontFamily array at the bottom to assign fallback fonts */
	// typography: {
	// 	h1: {
	// 		fontFamily: ""
	// 	},
	// 	h2: {
	// 		fontFamily: ""
	// 	},
	// 	h3: {
	// 		fontFamily: ""
	// 	},
	// 	fontFamily: ["Open Sans", "Segoe UI", "Tahoma", "sans-serif"].join(",")
	// },
	/** Overrides the cssBaseline component to allow for custom styling of scrollbars */
	// components: {
	// 	MuiCssBaseline: {
	// 		styleOverrides: {

	// 			body: {
	// 				"&::-webkit-scrollbar": {
	// 					backgroundColor: "#fff",
	// 					width: "15px"
	// 				},
	// 				"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": { //the scroll thingy
	// 					borderRadius: 10,
	// 					backgroundColor: '#888',
	// 					border: "3px solid #fff",

	// 				},
	// 				'&::-webkit-scrollbar-thumb:hover': {
	// 					background: '#555'
	// 				}
	// 			}
	// 		}
	// 	}
	// }
})
/** Tries to make all font sizes responsive based on screen size  */
// theme = responsiveFontSizes(theme)

export default theme;