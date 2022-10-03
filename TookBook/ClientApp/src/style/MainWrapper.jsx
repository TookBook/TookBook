import Box from '@mui/material/Box'

const MainWrapper = (props) => {

	return (
		<Box minHeight={"100vh"}>
			{props.children}
		</Box>
	)
}
export default MainWrapper