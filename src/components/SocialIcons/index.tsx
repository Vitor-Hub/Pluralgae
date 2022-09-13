import { Link } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const SocialIcons = () => {
    return(
        <>
            <Link target="_blank" href="http://www.google.com.br"><InstagramIcon fontSize="large"/></Link>
            <Link target="_blank" href="http://www.google.com.br"><FacebookIcon fontSize="large"/></Link>
            <Link target="_blank" href="http://www.google.com.br"><LinkedInIcon fontSize="large"/></Link>
            <Link target="_blank" href="http://www.google.com.br"><YouTubeIcon fontSize="large"/></Link>
        </>
    )
}

export default SocialIcons;