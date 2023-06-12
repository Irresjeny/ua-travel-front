import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {allCategory} from "../../data/category";
import {AllGoods} from "../../data/goods";
import {config} from "../../config";


const modalStyle = {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    width: '60%',
    borderRadius: 1,
    backgroundColor: 'white',
    overflow:'scroll',
    maxHeight:'70%',
}

const textFieldStyle = {
    minWidth: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px'
}

const selectStyle = {
    minWidth: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    height: '40px',
}

const saveButtonStyle = {
    color: 'white',
    backgroundColor: 'rgb(45, 3, 59)',
    ':hover': {
        backgroundColor: 'rgba(45,3,59,0.75)',
    },
    textTransform: 'none',
    fontSize: 20,
    minWidth: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    height: '40px',
}

const quillStyle ={
    minWidth: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
}

const imageStyle ={
    maxWidth: '60%',
    maxHeight: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
}

export default function ModalCreateEdit({open, setOpen, id, setId, categories, flag, setFlag}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState(0)
    const [allCategories, setAllCategories] = useState([])
    const [specification, setSpecification] = useState('')
    const [price, setPrice] = useState(0)
    const [rate, setRate] = useState(0)
    const [sex, setSex] = useState(null)
    const [isMain, setIsMain] = useState(false)

    const history = useHistory();

    useEffect(()=>{
        fetch(`${config.host}/admin/category/`, {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token': sessionStorage.getItem('token')
            },
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setAllCategories(data.category)
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/categories"})
            }
        })
        if(id){
            fetch(`${config.host}/admin/goods/${id}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
            }).then((response) => {
                if (response.status === 200) {
                    response.text().then((data) => {
                        let res = JSON.parse(data.replace(/\bNaN\b/g, "null")).category;
                        console.log(res)
                        setName(res.name)
                        setImage(res.image)
                        setCategory(res.category)
                        setSpecification(res.specification)
                        setPrice(res.price)
                        if (res.sex === null){
                            setSex(-1)
                        }else {
                            setSex(res.sex)
                        }
                        setIsMain(res.isMain)
                        setRate(res.rate)
                    })
                } else if (response.status === 401) {
                    history.push('/admin/authentication', {from: "/admin/places"})
                }
            })

        }
        else {
            setName('')
            setImage('')
            setCategory(0)
            setSpecification('')
            setPrice(0)
            setSex(-1)
            setIsMain(false)
            setRate(0)
        }
    }, [id])


    const handleSave = () => {
        if(id){
            fetch(`${config.host}/admin/goods/${id}`, {
                method:'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
                body:JSON.stringify({
                    name: name,
                    image: image,
                    category:category,
                    specification:specification,
                    price:parseFloat(price),
                    sex:sex,
                    isMain:isMain,
                    rate:rate,
                })
            }).then((response) => {
                if (response.status === 401) {
                    history.push('/admin/authentication', {from: "/admin/places"})
                } else {
                    close()
                    setFlag(flag + 1)
                    setId(0)
                }
            })
        }
        else {
            fetch(`${config.host}/admin/goods/`, {
                method:'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
                body:JSON.stringify({
                    name: name,
                    image: image,
                    rate:rate,
                    category:category,
                    specification:specification,
                    price:parseFloat(price),
                    sex:sex,
                    isMain:isMain,
                })
            }).then((response) => {
                if (response.status === 401) {
                    history.push('/admin/authentication', {from: "/admin/places"})
                } else {
                    close()
                    setFlag(flag + 1)
                    setId(0)
                }
            })
        }
    }

    const close = () => {
        setName('')
        setImage('')
        setCategory(0)
        setSpecification('')
        setPrice(0)
        setSex(-1)
        setIsMain(false)
        setOpen(false)
        setRate(0)
    }


    return <div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Stack
                    style={{marginTop: 10, fontSize:25}} alignItems={'center'}>{id ? 'Редагувати товар' : 'Додати товар'}</Stack>
                <Stack>
                    <TextField value={name} size="small" sx={textFieldStyle} label={'Назва'} onChange={(e)=>setName(e.target.value)}/>
                    <TextField multiline size="small" value={image} sx={textFieldStyle} label={'Зображення'} onChange={(e)=>setImage(e.target.value)}/>
                    <Stack sx={textFieldStyle}>Категорія</Stack>
                    <Select sx={selectStyle}
                            value={category}
                            onChange={(e) =>setCategory(e.target.value)}
                    >
                        {allCategories.map((item)=>(
                            <MenuItem value={item.id} key={item.id} >
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField multiline size="small" value={specification} sx={textFieldStyle} label={'Характеристики'} onChange={(e)=>setSpecification(e.target.value)}/>
                    <TextField value={price} size="small" sx={textFieldStyle} label={'Ціна'} onChange={(e)=>setPrice(e.target.value)}/>
                    <TextField value={rate} size="small" sx={textFieldStyle} label={'Рейтинг'} onChange={(e)=>setRate(e.target.value)}/>

                    <FormControlLabel sx={textFieldStyle}
                                      control={<Checkbox checked={isMain} onChange={() => setIsMain(!isMain)}/>}
                                      label="Рекомендовано"/>
                    <Stack sx={textFieldStyle}>Стать</Stack>
                    <Select sx={selectStyle}
                            value={sex}
                            onChange={(e) =>setCategory(e.target.value)}
                    >
                        <MenuItem value={-1}>
                            Нема
                        </MenuItem>
                        <MenuItem value={0}>
                            Чьоловіча
                        </MenuItem>
                        <MenuItem value={1}>Жіноча</MenuItem>
                        <MenuItem value={2}>Унісекс</MenuItem>
                    </Select>
                    <Button sx={saveButtonStyle} onClick={handleSave}>Зберегти</Button>
                </Stack>
            </Box>
        </Modal>
    </div>
}
