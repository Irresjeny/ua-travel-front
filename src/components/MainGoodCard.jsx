import {Button, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const test ={
    cursor:'pointer',
    ':hover': {
        backgroundColor: '#ffdc00',
    },
}

export default function MainGoodCard({good}) {
    const history = useHistory();
    const isMobile = useMediaQuery({ maxWidth: 600 })

    const buttonStyle={
        position:'absolute',
        backgroundColor:'#1970F2',
        color:'white',
        fontFamily:'DniproCity',
        fontWeight:'bold',
        fontSize:isMobile?'10px':'18px',
        padding: isMobile?'4px 20px':'10px 25px',
        borderRadius: '150px',
        left:isMobile?'90px':'140px',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        }
    }

    return <Stack minWidth={isMobile?'200px':'300px'} maxWidth={isMobile?'200px':'300px'} height={isMobile?'250px':'400px'} border={'1px solid black'} borderRadius={'20px'}
                  alignItems={'flex-start'} marginRight={'3%'} sx={test} marginBottom={'20px'} onClick={()=>{history.push(`/good/${good.id}`)}}>
        <img style={{overflow: 'hidden', borderRadius: '20px', marginTop: '3%', marginLeft:'5%', height:isMobile?'60%':'65%', objectFit: 'cover'}} width={'90%'}
             src={good.image.split(/\r?\n/)[0]}/>
        <Stack textAlign={'start'} position={'relative'} marginLeft={'5%'}>
            <Stack  maxHeight={isMobile?'2.5em':'2.5em'} fontSize={isMobile?16:24} fontWeight={700} sx={{overflowY:'hidden', width:'100%', marginRight:'5%'}}  >
                {good.name}
            </Stack>
            <Stack position={'absolute'} top={isMobile?'35px':'90px'} direction={'row'} alignItems={'center'} whiteSpace={'nowrap'}>
                <Stack fontSize={isMobile?14:18} fontWeight={400} flexDirection={'row'} marginBottom={'5%'} >
                    {parseFloat(good.price).toLocaleString()} грн.
                </Stack>
                <Button sx={buttonStyle}>купити</Button>
            </Stack>
        </Stack>


    </Stack>
}
