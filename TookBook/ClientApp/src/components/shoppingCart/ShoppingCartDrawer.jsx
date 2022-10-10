import { useState } from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
import { useRecoilState } from "recoil";
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import theme from "../../style/MuiTheme";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import shoppingCartState from "../../atoms/shoppingCartState";
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCart from '../../pages/shoppingCart';

const ShoppingCartDrawer = () => {
	const [openMenu, setOpenMenu] = useRecoilState(shoppingCartState)


	const CloseIcon = () => {

		return (
			<Box position={"relative"} sx={{}} >
				<Box sx={{ position: "absolute", top: "0", right: "0", maxWidth: "100px" }}>
					<IconButton onClick={() => setOpenMenu(false)} >
						<CancelIcon sx={{ fontSize: "5rem" }} />
					</IconButton>
				</Box>
			</Box >
		)
	}

	const showCloseButton = useMediaQuery(theme.breakpoints.down("sm"));

	return (

		<Drawer anchor="right"
			open={openMenu}
			variant="temporary"
			onClose={() => setOpenMenu(false)}
			sx={{
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: { sm: "500px" }, boxSizing: 'border-box', },

			}}
		>
			{showCloseButton && <CloseIcon />}
			<Toolbar sx={{ paddingTop: "7.6rem" }} />

			<Box maxWidth="100%" backgroundColor="" height="100%" flexDirection="column"
				sx={{ border: "1px solid", borderLeft: "none" }}
			>
				<Box padding="1rem" backgroundColor="mainbg.main" paddingBottom="2rem" >
					<Typography gutterBottom variant="h3" textAlign="center"> Your cart</Typography>
					<Box>
						<ShoppingCart />
						</Box>
				</Box>
				<Box >
					<List sx={{ backgroundColor: "primary.light", paddingTop: "0", paddingBottom: "2px", "&:first-of-type": { borderTop: "1px solid" } }}>
						{/* {menuItems.map((menuItem) => (
							<ListItemButton onClick={() => menuItem.func()} key={menuItem.label} sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "primary.light", }, borderBottom: "1px solid" }}>
								<ListItemIcon sx={{ color: "primary.dark" }}>{menuItem.icon}</ListItemIcon>
								<ListItemText primary={menuItem.label} primaryTypographyProps={{ fontWeight: "medium" }} />
							</ListItemButton>
						))} */}
					</List>

				</Box>
			</Box>

			<Box sx={{ verticalAlign: "middle", justifyContent: "center", display: "flex", borderRight: "1px solid", backgroundColor: "primary.light" }}>
				Test
			</Box>
		</Drawer>
	)
}

export default ShoppingCartDrawer