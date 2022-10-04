import { useRecoilState } from "recoil"
import { useState, forwardRef } from "react";
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from "@mui/material/Paper"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import openUserPortalState from "../../atoms/openUserPortalState";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


// Slide animation from Mui.
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

// Boilerplate code from Mui-Tabs to get tabs to work. see https://mui.com/material-ui/react-tabs/ for info.
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Box>{children}</Box>
				</Box>
			)}
		</div>
	);
}

const UserPortalContainer = () => {
	const [openContainer, setOpenContainer] = useRecoilState(openUserPortalState)
	const [tabValue, setTabValue] = useState(1);

	const handleClose = () => {
		setOpenContainer(false);
		// <Link to="/"></Link>
	}

	const handleTabChange = (e, newValue) => {
		setTabValue(newValue)
	}

	// TODO: Conditional rendering based on whether user is logged in or not, userloggedinstate
	return (
		<>
			<Dialog

				scroll="paper"

				fullWidth={true}
				maxWidth={"xs"}

				open={openContainer}
				TransitionComponent={Transition}
				sx={{ minWidth: "100%" }}
				// keepMounted
				onClose={handleClose}
				BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.1)" } }}
			>
				<Paper sx={{ minHeight: "550px" }} >

					<Tabs centered value={tabValue} onChange={handleTabChange}>
						<Tab label="Login" value={1} />
						<Tab label="Register" value={2} />
					</Tabs>

					<TabPanel value={tabValue} index={1}>
						<LoginForm />
					</TabPanel>

					<TabPanel value={tabValue} index={2}>
						<SignUpForm />
					</TabPanel>

				</Paper>
			</Dialog>
			<Outlet />
		</>
	)
}

export default UserPortalContainer