import * as React from 'react';
import { useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRecoilValue, useRecoilState } from 'recoil';
import { fetchedUsersState, activeUserState, adminModeState, isUserLoggedInState } from "../atoms"
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
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

const UserTableTest = ({ user, userList, setUserList }) => {
	const [userType, setUserType] = React.useState("")
	const [open, setOpen] = React.useState(false);

	const [selectBoxValue, setSelectBoxValue] = React.useState(userType)

	const getUser = async (id) => {
		const getUserResponse = await fetch(`/api/User/${id}`)
		if (getUserResponse == 200) {
			const fetchedUser = await getUserResponse.json()
			setTestUser(fetchedUser)
			return fetchedUser;
		}
		console.log(getUserResponse)
	}

	const handleOpenOrders = () => {

		setOpen(true)
	}
	const FEJKORDER = [
		{
			orderId: "99991234",
			date: "5731",
			books: "BÖCKER"
		},
		{
			orderId: "1233414",
			date: "513731",
			books: "MERBÖCKER"
		}
	]

	const handleCloseOrders = () => setOpen(false);

	const handleBlock = async (id, e) => {
		const isBlocking = e.target.checked
		let response = null

		const reqOptions = { method: "PUT" }

		isBlocking ?
			response = await fetch(`api/User/BlockUser/${id}`, reqOptions) :
			response = await fetch(`api/User/UnblockUser/${id}`, reqOptions)

		let updatedUsers = userList.map((user) => {
			let updatedUser = { ...user }

			if (updatedUser.userId === id) {

				if (response.status == 200)
					isBlocking ?
						updatedUser.isBlocked = true :
						updatedUser.isBlocked = false
			}
			return updatedUser
		})
		setUserList(updatedUsers)
	}

	useEffect(() => {
		console.log("usertable user is ", user)
	}, [])




	const handleUserTypeChange = async (id) => {
		const type = selectBoxValue
		let adminResponse = null
		let sellerResponse = null

		const reqOptions = { method: "PUT" }

		if (type == "Admin") {
			adminResponse = await fetch(`api/User/PromoteUser/${id}`, reqOptions)
			sellerResponse = await fetch(`api/User/DemoteSeller/${id}`, reqOptions)
		}
		if (type == "Seller") {
			adminResponse = await fetch(`api/User/DemoteUser/${id}`, reqOptions)
			sellerResponse = await fetch(`api/User/PromoteSeller/${id}`, reqOptions)
		}
		if (type == "Customer") {
			adminResponse = await fetch(`api/User/DemoteUser/${id}`, reqOptions)
			sellerResponse = await fetch(`api/User/DemoteSeller/${id}`, reqOptions)
		}

		let updatedUsers = userList.map((user) => {
			let updatedUser = { ...user }

			if (updatedUser.userId === id) {
				switch (type) {
					case "Admin":
						updatedUser.userType.isAdmin = true
						updatedUser.userType.isSeller = false
						break;
					case "Seller":
						updatedUser.userType.isAdmin = false
						updatedUser.userType.isSeller = true
						break;
					case "Customer":
						updatedUser.userType.isAdmin = false
						updatedUser.userType.isSeller = false
						break;
				}
			}
			return updatedUser
		})
		setUserList(updatedUsers)
	}


	useEffect(() => {
		if (user.userType.isAdmin) setUserType("Admin")
		if (user.userType.isSeller) setUserType("Seller")
		if (!user.userType.isAdmin && !user.userType.isSeller) setUserType("Customer")
	}, [])

	useEffect(() => {
		setSelectBoxValue(userType)
	}, [userType])


	useEffect(() => {
		handleUserTypeChange(user.userId);
	}, [selectBoxValue])

	return (
		<>
			<TableRow >
				<TableCell>{user.userName}</TableCell>
				<TableCell>{user.mail}</TableCell>
				<TableCell>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							value={selectBoxValue}
							onChange={(e) => setSelectBoxValue(e.target.value)}
						>
							<MenuItem value={"Customer"}>Customer</MenuItem>
							<MenuItem value={"Seller"}>Seller</MenuItem>
							<MenuItem value={"Admin"}>Admin</MenuItem>
						</Select>
					</FormControl>


				</TableCell>
				<TableCell>{user.isActive ? "Verified" : "Unverified"}</TableCell>

				<TableCell>{user.isBlocked ? "Blocked" : "Unblocked"} <Checkbox value={user.isBlocked} checked={user.isBlocked} onChange={(e) => (handleBlock(user.userId, e))} /></TableCell>

				<TableCell>
					<Button onClick={(e) => (handleOpenOrders())}>{user.orders ? user.orders.length : 0}</Button>
					<Modal open={open} onClose={(e) => (handleCloseOrders())} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
						<Box sx={{ ...style, width: "50%" }}>
							<h2 id="parent-modal-title"> {user.userName} Orders:  </h2>
							{user.orders.lenght > 0 ? user.orders.map((order) => order.orderId) :
								FEJKORDER.map((order) => (<Box display="flex" flexDirection="column">
									<Typography>{order.orderId}</Typography>
									<Typography>{order.date}</Typography>
									<Typography>{order.books}</Typography>
								</Box>))
							}




						</Box>
						{/**<Box display="flex" flexDirection="column"> 
								<Typography>{order.orderId}</Typography>
								<Typography>{order.date}</Typography>
								<Typography>{order.books}</Typography>
							</Box>  */}
					</Modal>
				</TableCell>
			</TableRow>
		</>
	)
}

export default UserTableTest