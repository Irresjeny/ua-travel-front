import {Rating, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";


const test = {
    ':hover': {
        backgroundColor: '#ffdc00',
    }
}

export default function Card({place}) {
    const isMobile = useMediaQuery({maxWidth: 600})


    return <Link to={`/place/${place.id}`} style={{textDecoration: 'none', color: 'black', marginRight:'1%'}}>
        <Stack minWidth={isMobile ? '250px' : '400px'} maxWidth={isMobile ? '250px' : '400px'}
               height={isMobile ? '250px' : '400px'} border={'1px solid black'} borderRadius={'20px'}
               alignItems={'flex-start'} marginRight={'1%'} sx={test} marginBottom={'20px'}>
            <img style={{
                overflow: 'hidden',
                borderRadius: '20px',
                marginTop: '3%',
                marginLeft: '5%',
                height: isMobile ? '60%' : '65%',
                objectFit: 'cover'
            }} width={'90%'}
                 src={place.image.split(/\r?\n/)[0]}/>
            <Stack textAlign={'start'} position={'relative'} marginLeft={'5%'} marginRight={'5%'}>
                <Stack maxHeight={isMobile ? '2.5em' : '2.7em'} fontSize={isMobile ? 16 : 24} fontWeight={700}
                       sx={{overflowY: 'hidden', width: '100%', marginRight: '5%'}}>
                    {place.name}
                </Stack>
                <Stack position={'absolute'} top={isMobile ? '45px' : '70px'}>
                    <Stack fontSize={isMobile ? 14 : 18} fontWeight={400}>
                        {place.cityName}
                    </Stack>
                    <Stack fontSize={isMobile ? 14 : 18} fontWeight={400} flexDirection={'row'} marginBottom={'5%'}
                           maxWidth={isMobile ? '200px' : '400px'}>
                        <Stack marginRight={'5%'} whiteSpace={'nowrap'}>Оцінка відвідувачів</Stack>
                        <Rating size={isMobile ? 'small' : ''} value={place.rate} precision={0.1} readOnly/>
                    </Stack>
                </Stack>
            </Stack>


        </Stack>
    </Link>
}
