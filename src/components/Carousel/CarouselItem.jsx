import {Stack} from "@mui/material";
import arrowNext from '../arrowNext.svg'
import arrowBack from '../arrowBack.svg'
import famousImg from './famous.png'
import {Link, useHistory} from "react-router-dom";

export default function CarouselItem({backgroundUrl, title, text, famous, nextItem, prevItem, id}) {
    const linkStyle = {
        textDecoration:'underline',
        color:'white',
        ':hover':{
            color:'#FFE545',
            cursor: 'pointer'
        }
    }

    return <Stack sx={{background: `url(${backgroundUrl}) no-repeat center center`, backgroundSize:'cover'}}  overflow={'hidden'} minWidth={'100%'} minHeight={`${window.innerHeight * 0.7}px`} flexDirection={'column-reverse'} marginTop={'0.5%'} position={'relative'}>
        <img src={famousImg} style={{position:'absolute', left:'0%', top:'10%', cursor: 'pointer', width:'20%', display:famous?'block':'none'}}/>
        <Stack flexDirection={'row'} position={'relative'} bottom={'5%'} justifyContent={"space-around"} alignItems={'flex-end'}>
            <img  src={arrowBack} onClick={prevItem} style={{position:'absolute', left:'15%', cursor: 'pointer'}}/>
            <Stack   color={'white'} fontWeight={'bold'} fontFamily={'DniproCity'}  maxWidth={'40%'}>
                <Link to={`/place/${id}`}>
                    <Stack fontSize={65} sx={linkStyle}>
                        {title}
                    </Stack>
                </Link>
                <Stack fontSize={20}>
                    {text}
                </Stack>
            </Stack>
            <img  src={arrowNext} onClick={nextItem} style={{position:'absolute', right:'15%', cursor: 'pointer'}}/>
        </Stack>

    </Stack>

}
