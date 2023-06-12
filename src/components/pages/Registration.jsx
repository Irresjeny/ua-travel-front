import {Badge, Button, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useHistory} from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useEffect, useLayoutEffect, useState} from "react";
import MediaQuery, {useMediaQuery} from "react-responsive";
import NavBar from "../NavBar";
import CategoryCard from "../CategoryCard";
import CartItem from "../Cart/CartItem";
import {validationCart} from "../../metods/validationCart";
import {MuiTelInput} from "mui-tel-input";
import EditIcon from '@mui/icons-material/Edit';
import RegistrationItem from "../Registration/RegistrationItem";
import MobileNavBar from "../MobileNavBar";
import {AllGoods} from "../../data/goods";
import {config} from "../../config";

export default function Registration() {
    const history = useHistory();
    const [items, setItems] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [sum, setSum] = useState(0)
    const [goods, setGoods] = useState([])

    const isMobile = useMediaQuery({maxWidth: 600})

    const buttonStyle = {
        width:'90%',
        marginTop:'1%',
        backgroundColor: '#1970F2',
        color: 'white',
        fontFamily: 'DniproCity',
        fontWeight: 'bold',
        fontSize: isMobile ? '10px' : '18px',
        padding: isMobile ? '4px 20px' : '15px 25px',
        borderRadius: '150px',
        marginLeft:'5%',
        // left:isMobile?'90px':'140px',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        }
    }

    const buyHandle = () => {
        let goodsList = ''
        for(let i = 0; i < goods.length; i++){
            goodsList += `${goods[i].name}(${goods[i].id})x ${items[i].count}`
            if(i<goods.length-1){
                goodsList+=';'
            }
        }
        fetch(`${config.host}/admin/orders/`, {
            method:'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body:JSON.stringify({
                name: name,
                surname: surname,
                phone:phone,
                email:email,
                goods:goodsList,
                sum:parseFloat(sum),
                status:'В обробці',
            })
        }).then((response) => {
            if (response.status === 401) {

            } else {
                localStorage.setItem('cart', '')
                history.push('/')
            }
        })
    }

    useLayoutEffect(() => {
        validationCart(setItems)
    }, [])

    useEffect(() => {
        let localGoods = []
        let localSum = 0
        for (let i = 0; i < items.length; i++) {
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
        }
    }, [items])

    const textFieldStyle = {
        marginTop: "8px",
        width: '90%',
        marginLeft:'5%',
        '.MuiInputBase-root':{
            borderRadius: '100px',
        },

    }

    const getButtonActive = () => {
        if(phone.length>0 && name.length>0 && surname.length>0 && email.length>0){
            return false
        }
        else return true
    }

    return <Stack alignItems={"flex-start"}  marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery minWidth={801}>
            <NavBar page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar page={'Головна'}/>
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile ? 40 : 80} marginTop={'50px'} fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'}>Оформлення замовлення</Stack>

        <Stack flexDirection={isMobile?'column':'row'} width={'100%'} marginBottom={'1%'}>
            <Stack width={isMobile?'90%':'40%'} border={'1px solid black'} borderRadius='40px' marginLeft={'5%'} maxHeight={'600px'}>
                <Stack marginLeft={'5%'} fontSize={isMobile ? 20 : 40} marginTop={'5%'} fontFamily={'DniproCity'}
                       fontWeight={'bold'} marginBottom={'5%'} alignItems={'flex-start'}>Особисті дані</Stack>
                <TextField required sx={textFieldStyle} label={'Ваше ім\'я'} value={name} onChange={(e)=>setName(e.target.value)}/>
                <TextField required sx={textFieldStyle} label={'Ваше прізвище'} value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                <MuiTelInput sx={textFieldStyle} forceCallingCode defaultCountry={'UA'}
                             onlyCountries={['UA']} value={phone} label="Телефон" required
                             onChange={(e) => setPhone(e)} inputProps={{ maxLength: 11 }}/>
                <TextField required sx={textFieldStyle} label={'Електронна пошта'} value={email} onChange={(e)=>setEmail(e.target.value)} type={'email'}/>
                <Button disabled={getButtonActive()} sx={buttonStyle} onClick={() => buyHandle()}>Підтердити</Button>
            </Stack>
            <Stack width={isMobile?'90%':'40%'} border={'1px solid black'} borderRadius='40px' marginLeft={'5%'}>
                <Stack flexDirection={'row'} width={'100%'} alignItems={'center'} justifyContent={'space-between'} >
                    <Stack marginLeft={'5%'} fontSize={isMobile ? 20 : 40} marginTop={'5%'} fontFamily={'DniproCity'}
                           fontWeight={'bold'} marginBottom={'5%'} alignItems={'flex-start'}>Ваше замовлення</Stack>
                    <EditIcon sx={{marginRight:'5%', border:'1px solid black', borderRadius:'13px', padding:'5px', cursor:'pointer'}} onClick={()=>{history.push('/cart')}}/>
                </Stack>
                <Stack marginLeft={'5%'}>
                    {goods.map((good, i) => {
                        return <RegistrationItem goodData={good} count={items[i].count} key={i}/>
                    })}
                </Stack>
                <Stack>
                    <Stack marginLeft={'5%'} fontSize={isMobile ? 20 : 40} marginTop={'5%'} fontFamily={'DniproCity'}
                           fontWeight={'bold'} marginBottom={'5%'} alignItems={'flex-start'}> Сума: {sum}  ₴</Stack>
                </Stack>
            </Stack>
        </Stack>


    </Stack>
}
