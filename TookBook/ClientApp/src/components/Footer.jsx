import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar";
import WavySVG from "../assets/svg/wavyBottom.svg"


const svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#6D597A" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>

const svgencoded = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 20 1440 300'%3E%3Cpath fill='%236D597A' fill-opacity='1' d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E";


const Footer = () => {

	return (

		<Box position={"relative"} paddingTop={"5em"}>
			<Box minWidth={"100%"} minHeight={"200px"}
				sx={{ backgroundImage: `url("${svgencoded}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></Box>


			<Toolbar sx={{ justifyContent: "center", bgcolor: "#6D597A", height: "151px" }}>
				<Typography color={"white"}>
					© 2022 TookBook
				</Typography>
				<Box sx={{ verticalAlign: "middle" }}>
					<Link href=""></Link>
				</Box>
			</Toolbar>
		</Box >


	)
}

export default Footer