import {Badge, Button, Stack} from "@mui/material";
import * as React from "react";
import {useHistory} from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useEffect, useLayoutEffect, useState} from "react";
import MediaQuery, {useMediaQuery} from "react-responsive";
import NavBar from "../NavBar";
import CategoryCard from "../CategoryCard";
import CartItem from "../Cart/CartItem";
import {validationCart} from "../../metods/validationCart";
import MobileNavBar from "../MobileNavBar";
import {AllGoods} from "../../data/goods";
import {config} from "../../config";

export default function Cart() {
    const history = useHistory();
    const [items, setItems] = useState([])
    const [goods, setGoods] = useState([])
    const [flag, setFlag] = useState(0)
    const [sum, setSum] = useState(0)

    const isMobile = useMediaQuery({maxWidth: 600})

    const buttonStyle = {
        backgroundColor: '#1970F2',
        color: 'white',
        fontFamily: 'DniproCity',
        fontWeight: 'bold',
        fontSize: isMobile ? '10px' : '18px',
        padding: isMobile ? '4px 20px' : '10px 25px',
        borderRadius: '150px',
        // left:isMobile?'90px':'140px',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        },
        marginTop: '1%'
    }


    useLayoutEffect(() => {
        validationCart(setItems)
    }, [flag])

    useEffect(() => {
        let localGoods = []
        let localSum = 0
        const f = async () => {
            for (let i = 0; i < items.length; i++) {
                const resp = await fetch(`${config.host}/goods/${items[i].id}`)
                const data = await resp.json()
                console.log(data)
                localGoods.push(data.category)
                localSum += parseFloat(data.category.price) * parseInt(items[i].count)
            }
            setGoods(localGoods)
            setSum(localSum)
            console.log(localSum)
        }
        f()
        }, [flag, items]
    )


    return <Stack alignItems={"flex-start"}  marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery minWidth={801}>
            <NavBar page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar page={'Головна'}/>
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile ? 40 : 80} marginTop={'50px'} fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'}>Кошик</Stack>
        {goods.map((good, i) => {
            console.log(good.id)
            return <CartItem goodData={good} key={i} position={i} items={items} setItems={setItems} flag={flag}
                             setFlag={setFlag} sum={sum} setSum={setSum}/>
        })}
        <Stack marginLeft={'5%'} display={goods.length > 0 ? 'flex' : 'none'}>
            <Stack fontSize={'20px'}>Сума замовлення: {sum} ₴</Stack>
            <Button sx={buttonStyle} onClick={() => {
                history.push('/registration')
            }}>Оформити замовлення</Button>
        </Stack>

    </Stack>
}
