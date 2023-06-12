import {Badge, Stack} from "@mui/material";
import * as React from "react";
import {useHistory} from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useEffect, useState} from "react";

export default function CartButton({flag}) {
    const history = useHistory();
    const [num, setNum] = useState(0)

    useEffect(()=>{
        let items = []
        try{
            items = JSON.parse(localStorage.getItem('cart'))
            setNum(items.length)
        }
        catch {
            localStorage.setItem('cart', JSON.stringify([]))
            setNum(0)
        }

    }, [flag])

    return <Stack flexDirection={'row'} alignItems={'center'} sx={{cursor: 'pointer'}} onClick={()=>{history.push('/cart')}}>
        <Badge badgeContent={num} color="neutral" sx={{'.MuiBadge-badge':{border:'1px solid black'}}} showZero={true}>
            <ShoppingCartOutlinedIcon color="action" />
        </Badge>
    </Stack>
}
