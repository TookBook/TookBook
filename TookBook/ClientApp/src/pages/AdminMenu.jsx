import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import { useRecoilValue } from 'recoil';
// import { fetchedUsersState } from '../atoms';
import Users from '../../../userSeedData.json' //Temp solution

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

  
const AdminMenu = () => {
	// const Users = useRecoilValue(fetchedUsersState)
	const [userType, setUserType] = React.useState();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};
	const handleChange = (event) => {
		setUserType(event.target.value);
	};

	//Lite psuedo kod för hur man ska ändra usertype
	const handleUserType =(event) => {
		let type = event.target.value;

		switch (type) {
			case "Admin":
				user.userType.isAdmin = true
				user.userType.isSeller = false
				break;
			case "Seller":
				user.userType.isAdmin = false
				user.userType.isSeller = true
				break;
			case "Customer":
				user.userType.isAdmin = false
				user.userType.isSeller = false
				break;
		}
	}



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
			  <TableRow key={user.id}>
				<TableCell>{user.username}</TableCell>
				<TableCell>{user.mail}</TableCell>
				<TableCell>{user.userType.isAdmin? "Admin" : user.userType.isSeller? "Seller" : "Customer" } 

				{/*all users use the same usestate for now*/}
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						value={user.userType.isAdmin? "Admin" : user.userType.isSeller? "Seller" : "Customer"}
						onChange={handleChange}
						>
						<MenuItem value={"Customer"}>Customer</MenuItem>
						<MenuItem value={"Seller"}>Seller</MenuItem>
						<MenuItem value={"Admin"}>Admin</MenuItem>
					</Select>
					</FormControl>


				</TableCell>
				<TableCell>{user.isActive? "Verified" : "Unverified"}</TableCell>
				{/* // checkbox should change status on users blocked state */}
				<TableCell>{user.isBlocked? "Blocked" : "Unblocked"} <Checkbox /></TableCell> 

				<TableCell>
					<Button onClick={handleOpen}>{user.orders? user.orders.length : 0}</Button>
					<Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
						<Box sx={{ ...style, width: 400 }}>
						<h2 id="parent-modal-title">Username should be here but every user has the same modal so it displays the last users name instead..</h2>
						some kind of list here of all orders. click order for more info <br />
						<ChildModal /> <br />
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