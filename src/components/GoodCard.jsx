import {Button, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const test ={
    cursor:'pointer',
    ':hover': {
        backgroundColor: '#ffdc00',
    },
}

export default function GoodCard({good}) {
    const history = useHistory();
    const isMobile = useMediaQuery({ maxWidth: 600 })


    return <Stack minWidth={isMobile?'200px':'350px'} maxWidth={isMobile?'200px':'350px'} height={isMobile?'250px':'450px'} border={'1px solid black'} borderRadius={'20px'}
                  alignItems={'flex-start'} marginRight={'3%'} sx={test} marginBottom={'20px'} onClick={()=>{history.push(`/good/${good.id}`)}}>
        <img style={{overflow: 'hidden', borderRadius: '20px', marginTop: '3%', marginLeft:'5%', height:isMobile?'60%':'65%', objectFit: 'cover'}} width={'90%'}
             src={good.image.split(/\r?\n/)[0]}/>
        <Stack textAlign={'start'} position={'relative'} marginLeft={'5%'}  width={'80%'}>
            <Stack maxHeight={isMobile?'2.5em':'2.7em'} fontSize={isMobile?16:24} fontWeight={700} sx={{overflowY:'hidden', width:'100%', marginRight:'5%'}}  >
                {good.name}
            </Stack>
            <Stack position={'absolute'} top={isMobile?'35px':'90px'} direction={'row'} width={'100%'} alignItems={'flex-start'}>
                <Stack fontSize={isMobile?14:18} fontWeight={400} flexDirection={'row'} marginBottom={'5%'} whiteSpace={'nowrap'}>
                    {parseFloat(good.price).toLocaleString()} ₴
                </Stack>
                <Stack flexDirection={'row'} marginLeft={'auto'}>
                    {good.rate} ⭐
                </Stack>
            </Stack>
        </Stack>


    </Stack>
}
