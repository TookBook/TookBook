import * as React from 'react';
import { useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRecoilValue, useRecoilState } from 'recoil';
import { fetchedUsersState, activeUserState, adminModeState, isUserLoggedInState } from '../atoms';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

function ChildModal() {

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};


	return (
		<React.Fragment>
			<Button onClick={handleOpen}>Order date</Button>
			<Modal
				hideBackdrop
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...style, width: 500 }}>
					<h2 id="child-modal-title">Order date or id</h2>
					<p id="child-modal-description">
						list of all books in order, price etc
					</p>
					<Button onClick={handleClose}>Close</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

function preventDefault(event) {
	event.preventDefault();
}

// TODO: Check if user.usertype is admin to render page, otherwise render error page
const AdminMenu = () => {
	const navigate = useNavigate()
	const adminMode = useRecoilValue(adminModeState)
	// const Users = useRecoilValue(fetchedUsersState)
	const [Users, setUsers] = useRecoilState(fetchedUsersState)
	const [userType, setUserType] = React.useState();
	const [open, setOpen] = React.useState(false);


	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false);

	const handleBlock = async (id, e) => {
		const isBlocking = e.target.checked
		let response = null

		const reqOptions ={method: "PUT"}

		isBlocking ? 
		 response = await fetch(`api/User/BlockUser/${id}`, reqOptions) :
		 response = await fetch(`api/User/UnblockUser/${id}`, reqOptions)

		let updatedUsers = Users.map( (user) => {
			let updatedUser ={...user}
			
			if (updatedUser.userId === id){
					
				if ( response.status == 200 )
				 isBlocking ? 
				 updatedUser.isBlocked = true :
				 updatedUser.isBlocked = false
			}
			return updatedUser
		})	
		setUsers(updatedUsers)
		console.log(updatedUsers);
	}

	const handleUserTypeChange = async (id, e) => {
		let type = e.target.value;
		const reqOptions ={method: "PUT"}
		let adminResponse = null
		let sellerResponse = null
		if	(type == "Admin"){
			adminResponse = await fetch(`api/User/PromoteUser/${id}`, reqOptions) 
			sellerResponse = await fetch(`api/User/DemoteSeller/${id}`, reqOptions)
		}
		if (type == "Seller"){
			adminResponse = await fetch(`api/User/DemoteUser/${id}`, reqOptions)
			sellerResponse = await fetch(`api/User/PromoteSeller/${id}`, reqOptions)
		}

		let updatedUsers = Users.map((user) => {
			let updatedUser ={...user}
			if (updatedUser.userId===id) {				
				switch (type, adminResponse.status) {
					case "Admin", 200:
						console.log(user)
						updatedUser.userType.isAdmin = true
						updatedUser.userType.isSeller = false
						break;
					case "Seller", 200:
						updatedUser.userType.isAdmin = false
						updatedUser.userType.isSeller = true
						break;
					case "Customer", 200:
						updatedUser.userType.isAdmin = false
						updatedUser.userType.isSeller = false
						break;
				}
				return updatedUser
			}
		})
		setUsers(updatedUsers)
	}

	useEffect(() => {
		if (!adminMode) navigate("/")
	}, [adminMode])

	return (
		<React.Fragment>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Username</TableCell>
						<TableCell>Mail</TableCell>
						<TableCell>User Type</TableCell>
						<TableCell>Verified Status</TableCell>
						<TableCell>Blocked Status</TableCell>
						<TableCell>Orders</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Users.map((user) => (
						<TableRow key={user.userId}>
							<TableCell>{user.userName}</TableCell>
							<TableCell>{user.mail}</TableCell>
							<TableCell>
								{/*all users use the same usestate for now*/}
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<Select
										value={user.userType.isAdmin ? "Admin" : user.userType.isSeller ? "Seller" : "Customer"}
										onChange={(e) => (handleUserTypeChange(user.userId, e))}
									>
										<MenuItem value={"Customer"}>Customer</MenuItem>
										<MenuItem value={"Seller"}>Seller</MenuItem>
										<MenuItem value={"Admin"}>Admin</MenuItem>
									</Select>
								</FormControl>


				</TableCell>
				<TableCell>{user.isActive? "Verified" : "Unverified"}</TableCell>

				<TableCell>{user.isBlocked? "Blocked" : "Unblocked"} <Checkbox value={user.isBlocked} checked ={user.isBlocked} onChange={(e)=>(handleBlock(user.userId, e))}/></TableCell> 

				<TableCell>
					<Button onClick={handleOpen}>{user.orders? user.orders.length : 0}</Button>
					<Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
						<Box sx={{ ...style, width: "50%" }}>
						<h2 id="parent-modal-title"> Username should be here but every user has the same modal so it displays the last users name instead..</h2>
						some kind of list here of all orders. click order for more info <br />
						<ChildModal /><br />
						<ChildModal /><br />
						<ChildModal /><br />
						<ChildModal /><br />
						<ChildModal /><br />
						<ChildModal />
						</Box>
					</Modal>
				</TableCell>
			  </TableRow>
			))}
		  </TableBody>
		</Table>
		<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
		  See more users
		</Link>
	  </React.Fragment>
	)
}


export default AdminMenu