import * as React from 'react';
import {InputAdornment, Stack, TextField} from "@mui/material";
import RegionMenuButton from "./Menu/RegionMenuButton";
import Logo from "./Menu/Logo";
import ContactsMenuButton from "./Menu/ContactsMenuBatton";
import {useHistory} from "react-router-dom";
import CategoryButton from "./GoodsLine/CategoryButton";
import CartButton from "./CartButton";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {useState} from "react";
import {useMediaQuery} from "react-responsive";




export default function GoodsLine({flag}) {
    const history = useHistory();
    const [text, setText] = useState('')
    const isMobile = useMediaQuery({maxWidth: 600})
    return <Stack flexDirection={'row'} justifyContent={isMobile?'space-around':'space-between'} alignItems={'center'} marginTop={'10px'} borderBottom={'3px solid #828282'} paddingBottom={'20px'} width={'100%'}>
        <CategoryButton/>
        {/*<TextField label={'Я шукаю...'} sx={{width:'50%'}} value={text} onChange={(e) => setText(e.target.value)} InputProps={{*/}
        {/*    startAdornment: (*/}
        {/*        <InputAdornment position="start">*/}
        {/*            <SearchOutlinedIcon />*/}
        {/*        </InputAdornment>*/}
        {/*    ),*/}
        {/*    sx:{borderRadius:'100px'}*/}
        {/*}} InputLabelProps={{shrink: text.length>0, sx:{marginLeft:text.length>0?'5px':'30px'}}}*/}
        {/*/>*/}
        <CartButton flag={flag}/>
    </Stack>
}
