import * as React from 'react';
import {Stack} from "@mui/material";
import RegionMenuButton from "./Menu/RegionMenuButton";
import Logo from "./Menu/Logo";
import ContactsMenuButton from "./Menu/ContactsMenuBatton";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';


export default function MobileNavBar({region, page}) {
    const [open, setOpen] = useState(false)


    const history = useHistory();
    return <Stack flexDirection={'column'} width={'100%'}>
        <Stack flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} marginTop={'10px'}
               borderBottom={'3px solid #828282'} paddingBottom={'20px'} width={'100%'}>
            <MenuIcon onClick={()=>setOpen(!open)}/>
            <Logo/>
            <RegionMenuButton region={region}/>
        </Stack>
        <Stack flexDirection={'row'} justifyContent={'space-evenly'} alignItems={'center'} display={open?'flex':'none'} borderBottom={'3px solid #828282'}>
            <Stack sx={{
                textDecoration: page === 'Головна' ? 'underline black' : '',
                textUnderlineOffset: '2px',
                cursor: page === 'Головна' ? 'default' : 'pointer'
            }} fontSize={20} onClick={() => {
                history.push('/')
            }}>Головна</Stack>
            <Stack sx={{
                textDecoration: page === 'Магазин' ? 'underline black' : '',
                textUnderlineOffset: '2px',
                cursor: page === 'Магазин' ? 'default' : 'pointer'
            }} fontSize={20} onClick={() => {
                history.push('/categories')
            }}>Магазин</Stack>
            <ContactsMenuButton/>
        </Stack>
    </Stack>

}
