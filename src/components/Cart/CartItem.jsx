import {Rating, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useEffect, useLayoutEffect, useState} from "react";
import {allCategory} from "../../data/category";
import {AllGoods, MainGoods} from "../../data/goods";
import {Link} from "react-router-dom";
import {validationCart} from "../../metods/validationCart";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const test = {
    alignItems: 'center',
    ':hover': {
        backgroundColor: '#ffdc00',
    }
}

export default function RegistrationItem({goodData, position, items, setItems, flag, setFlag, sum, setSum}) {
    const isMobile = useMediaQuery({maxWidth: 600})
    const [good, setGood] = useState({specification: '', image: ''})
    const [num, setNum] = useState(0)

    useEffect(() => {
        if(items[position]){
            setNum(items[position].count)
            setGood(goodData)
        }
    }, [goodData, flag])

    const removeHandler = () => {
        let temp = items;
        temp.splice(position, 1)
        setItems(temp);
        setFlag(flag + 1)
        localStorage.setItem('cart', JSON.stringify(temp));
    }

    const plusHandler = () => {
        let temp = items;
        temp[position].count += 1;
        setItems(temp);
        setNum(temp[position].count)
        localStorage.setItem('cart', JSON.stringify(temp));
        setFlag(flag + 1)
    }

    const minusHandler = () => {
        let temp = items;
        if(temp[position].count>1){
            temp[position].count -= 1;
            setItems(temp);
            setNum(temp[position].count)
            localStorage.setItem('cart', JSON.stringify(temp));
            setFlag(flag + 1)
        }
    }

    return <Stack width={isMobile ? '250px' : '90%!important'} height={isMobile ? '250px' : '200px'} marginLeft={'5%'}
                  border={'1px solid black'}
                  borderRadius={'20px'}
                  alignItems={'flex-start'} marginRight={'1%'} sx={test} marginBottom={'20px'} flexDirection={isMobile?'column':'row'}>
        <img style={{
            overflow: 'hidden',
            borderRadius: '20px',
            marginTop: '2%',
            marginLeft: '3%',
            height: isMobile ? '60%' : '85%',
            objectFit: 'cover',
            marginBottom:'2%'
        }} width={'20%'} src={good.image.split(/\r?\n/)[0]}/>
        <Stack textAlign={'start'} position={'relative'} marginLeft={'5%'} width={'50%'}>
            <Link to={`/good/${good.id}`} style={{textDecoration: 'none', color: 'black', maxWidth: '90%'}}>
                {/*{good.id}*/}
                <Stack maxHeight={isMobile ? '2.5em' : '2.7em'} fontSize={isMobile ? 16 : 20} fontWeight={700}
                       sx={{overflowY: 'hidden', width: '100%', marginRight: '5%'}}>
                    {good.name}
                </Stack>
                <Stack alignItems={'flex-start'} fontSize={'14px'} maxHeight={isMobile ? '2.5em' : '4em'}
                       sx={{overflow: 'hidden', width: '100%', marginRight: '5%'}}>
                    {good.specification.split(/\r?\n/).slice(0, 3).map((item, i) => {
                        return <Stack key={i} sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            textOverflow: 'ellipsis',
                            display: 'inline-block'
                        }}>{item}</Stack>
                    })}
                </Stack>
            </Link>
        </Stack>
        <Stack flexDirection={'row'} sx={{alignItems: 'center'}} minWidth={'5%'} marginRight={'5%'}>
            <RemoveIcon sx={{
                marginRight: '5%',
                border: '1px solid black',
                borderRadius: '8px',
                padding: '5px',
                cursor: 'pointer'
            }} onClick={()=>minusHandler()}/>
            <Stack sx={{
                marginRight: '5%',
                border: '1px solid black',
                borderRadius: '8px',
                padding: '6.5px 13px',
                cursor: 'pointer'
            }}>
                {num}
            </Stack>
            <AddIcon sx={{
                marginRight: '5%',
                border: '1px solid black',
                borderRadius: '8px',
                padding: '5px',
                cursor: 'pointer'
            }} onClick={()=>plusHandler()}/>
        </Stack>
        <Stack fontSize={'20px'} minWidth={'10%'} marginRight={'5%'}>
            {good.price * items[position]?.count} ₴
        </Stack>
        <DeleteTwoToneIcon sx={{
            marginRight: '5%',
            cursor: 'pointer',
            fontSize: '30px'
        }} onClick={()=>{removeHandler()}}/>
    </Stack>
}
