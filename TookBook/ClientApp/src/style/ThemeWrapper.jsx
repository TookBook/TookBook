import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline'
import theme from "./MuiTheme"


const ThemeWrapper = (props) => {

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	)
}

export default ThemeWrapper
