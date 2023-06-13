import {Rating, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import {allCategory} from "../../data/category";
import {AllGoods, MainGoods} from "../../data/goods";
import {Link} from "react-router-dom";


const test = {
    ':hover': {
        backgroundColor: '#ffdc00',
    }
}

export default function RegistrationItem({goodData, count}) {
    const history = useHistory();
    const isMobile = useMediaQuery({maxWidth: 600})
    const [good, setGood] = useState({specification: '', image: ''})

    useEffect(() => {
        setGood(goodData)
    }, [])


    return <Link to={`/good/${good.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <Stack width={isMobile ? '250px' : '90%'} height={isMobile ? '250px' : '150px'} border={'1px solid black'}
               borderRadius={'20px'}
               alignItems={'flex-start'} marginRight={'1%'} sx={test} marginBottom={'20px'} flexDirection={'row'}>
            <img style={{
                overflow: 'hidden',
                borderRadius: '20px',
                marginTop: '2%',
                marginLeft: '3%',
                height: isMobile ? '60%' : '85%',
                objectFit: 'cover'
            }} width={'30%'}                 src={good.image.split(/\r?\n/)[0]}/>
            <Stack textAlign={'start'} position={'relative'} marginLeft={'5%'} marginRight={'5%'} width={'50%'}>
                <Stack maxHeight={isMobile ? '2.5em' : '2.7em'} fontSize={isMobile ? 16 : 20} fontWeight={700}
                       sx={{overflowY: 'hidden', width: '100%', marginRight: '5%'}}>
                    {good.name}
                </Stack>
                <Stack alignItems={'flex-start'} fontSize={'14px'} maxHeight={isMobile ? '2.5em' : '4em'} sx={{overflow: 'hidden', width: '100%', marginRight: '5%'}}>
                    {good.specification.split(/\r?\n/).slice(0, 3).map((item, i) => {
                        return <Stack key={i} sx={{overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textOverflow: 'ellipsis', display:'inline-block'}}>{item}</Stack>
                    })}
                </Stack>
                <Stack fontSize={'20px'}>
                    x{count} {good.price} ₴ = {good.price*count} ₴
                </Stack>
            </Stack>


        </Stack>
    </Link>
}
