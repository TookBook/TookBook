import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import theme from "../style/MuiTheme";
import { Form } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';



//TODO: Get results from useLocation navigation thingy
// Display search results based on useLocation selectBoxFilter-thingy and the search term.
// If both are empty, display list of all books.
// Use pagination for search results?
const SearchResultsPage = () => {
	const location = useLocation();

	useEffect(() => {
		console.log(location.state)
	}, [location.state])

	return (

		<div>Hi, I'm a search results page {location.state.searchItem}</div>
	)
}


export default SearchResultsPage