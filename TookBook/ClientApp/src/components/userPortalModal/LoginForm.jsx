import { useRecoilState } from "recoil"
import { useState, forwardRef } from "react";
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
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
import Link from "@mui/material/Link";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Avatar from '@mui/material/Avatar';

// TODO: API requests, get user etc. Add helpertext. Frontend validation of username/pass?
const LoginForm = () => {

	const [usernameField, setUsernameField] = useState("")
	const [passwordField, setPasswordField] = useState("")


	const handleLoginSubmit = (e) => {
		e.preventDefault();
		console.log(usernameField)
	}
	return (
		<Box
			sx={{
				marginTop: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
				<PersonSharpIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign In
			</Typography>

			<Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					autoFocus
					margin="normal"
					required
					fullWidth
					id="name"
					label="Username"
					name="name"
					// onFocus={}
					error={usernameField !== "" && usernameField.length < 5}
					autoComplete="off"
					onChange={(e) => setUsernameField(e.target.value)}
				// helperText={}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					// onFocus={}
					error={passwordField !== "" && passwordField.length < 5}
					autoComplete="new-password"
					onChange={(e) => setPasswordField(e.target.value)}
				// helperText={}
				/>

				<Typography color="error.light" textAlign="center">Error placeholder</Typography>


				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={passwordField.length < 5 && usernameField.length < 5} // TODO: proper mini validation
				>
					Login
				</Button>

				<Box textAlign="center">
					<Link
						component="button"
						variant="body2"
					>
						Forgotten your password?
					</Link>

				</Box>
			</Box>

		</Box>
	)
}

export default LoginForm