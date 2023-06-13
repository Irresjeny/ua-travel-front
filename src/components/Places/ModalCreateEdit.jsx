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
import {AllPlacesList} from "../../data/places";
import {regions} from "../../data/regions";
import {config} from "../../config";


const modalStyle = {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    width: '60%',
    borderRadius: 1,
    backgroundColor: 'white',
    overflow: 'scroll',
    maxHeight: '70%',
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


export default function ModalCreateEdit({open, setOpen, id, setId, categories, flag, setFlag}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [address, setAddress] = useState('')
    const [cityName, setCityName] = useState('')
    const [priceAdult, setPriceAdult] = useState(0)
    const [priceChild, setPriceChild] = useState('')
    const [workSchedule, setWorkSchedule] = useState('')
    const [contacts, setContacts] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState(0)
    const [isMainCarousel, setIsMainCarousel] = useState(false)
    const [isRegionCarousel, setIsRegionCarousel] = useState(false)
    const [famous, setFamous] = useState(false)
    const [region, setRegion] = useState(0)
    const [rate, setRate] = useState(0)

    const history = useHistory();

    useEffect(() => {
        if (id) {
            fetch(`${config.host}/admin/places/${id}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
            }).then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    response.text().then((data) => {

                        let res = JSON.parse(data.replace(/\bNaN\b/g, "null")).category;
                        console.log(res)
                        setName(res.name)
                        setImage(res.image)
                        setAddress(res.address)
                        setCityName(res.cityName)
                        setPriceAdult(res.priceAdult)
                        setPriceChild(res.priceChild)
                        setWorkSchedule(res.workSchedule)
                        setContacts(res.contacts)
                        setDescription(res.description)
                        setType(res.type)
                        setIsMainCarousel(res.isMainCarousel)
                        setIsRegionCarousel(res.isRegionCarousel)
                        setFamous(res.famous)
                        setRegion(res.region)
                        setRate(res.rate)
                    })
                } else if (response.status === 401) {
                    history.push('/admin/authentication', {from: "/admin/places"})
                }
            })
        } else {
            setName('')
            setImage('')
            setAddress('')
            setCityName('')
            setPriceAdult(0)
            setPriceChild('')
            setWorkSchedule('')
            setContacts('')
            setDescription('')
            setType(0)
            setIsMainCarousel(false)
            setIsRegionCarousel(false)
            setFamous(false)
            setRegion(0)
            setRate(0)
        }
    }, [id])


    const handleSave = () => {
        if (id) {
            fetch(`${config.host}/admin/places/${id}`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: name,
                    image: image,
                    address: address,
                    cityName: cityName,
                    priceAdult: parseFloat(priceAdult),
                    priceChild: parseFloat(priceChild),
                    workSchedule: workSchedule,
                    contacts: contacts,
                    description: description,
                    type: parseInt(type),
                    isMainCarousel: isMainCarousel,
                    isRegionCarousel: isRegionCarousel,
                    famous: famous,
                    region: region,
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

        } else {
            fetch(`${config.host}/admin/places/`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: name,
                    image: image,
                    address: address,
                    cityName: cityName,
                    priceAdult: parseFloat(priceAdult),
                    priceChild: parseFloat(priceChild),
                    workSchedule: workSchedule,
                    contacts: contacts,
                    description: description,
                    type: parseInt(type),
                    isMainCarousel: isMainCarousel,
                    isRegionCarousel: isRegionCarousel,
                    famous: famous,
                    region: region,
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
    }

    const close = () => {
        setName('')
        setImage('')
        setAddress('')
        setCityName('')
        setPriceAdult(0)
        setPriceChild('')
        setWorkSchedule('')
        setContacts('')
        setDescription('')
        setType(0)
        setIsMainCarousel(false)
        setIsRegionCarousel(false)
        setFamous(false)
        setRegion(0)
        setRate(0)
        setOpen(false)
    }


    return <div>
        <Modal
            open={open}
            onClose={() => close()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Stack
                    style={{marginTop: 10, fontSize: 25}}
                    alignItems={'center'}>{id ? 'Редагувати пам\'ятку' : 'Додати  пам\'ятку'}</Stack>
                <Stack>
                    <TextField value={name} size="small" sx={textFieldStyle} label={'Назва'}
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField multiline size="small" value={image} sx={textFieldStyle} label={'Зображення'}
                               onChange={(e) => setImage(e.target.value)}/>
                    <TextField value={address} size="small" sx={textFieldStyle} label={'Адреса'}
                               onChange={(e) => setAddress(e.target.value)}/>
                    <TextField value={cityName} size="small" sx={textFieldStyle} label={'Місто'}
                               onChange={(e) => setCityName(e.target.value)}/>
                    <TextField value={priceAdult} size="small" sx={textFieldStyle} label={'Ціна для дорослого'}
                               onChange={(e) => setPriceAdult(e.target.value)}/>
                    <TextField value={priceChild} size="small" sx={textFieldStyle} label={'Ціна для дитини'}
                               onChange={(e) => setPriceChild(e.target.value)}/>
                    <TextField value={rate} size="small" sx={textFieldStyle} label={'Рейтинг'}
                               onChange={(e) => setRate(e.target.value)}/>
                    <TextField value={workSchedule} size="small" sx={textFieldStyle} label={'Розклад'}
                               onChange={(e) => setWorkSchedule(e.target.value)}/>
                    <TextField value={contacts} size="small" sx={textFieldStyle} label={'Контакти'}
                               onChange={(e) => setContacts(e.target.value)}/>
                    <TextField value={description} multiline size="small" sx={textFieldStyle} label={'Опис'}
                               onChange={(e) => setDescription(e.target.value)}/>
                    <Stack sx={textFieldStyle}>Тип місця</Stack>
                    <Select
                        sx={selectStyle}
                        inputProps={{sx: {padding: '0 10px'}}}
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    >
                        <MenuItem value={1}>Парки</MenuItem>
                        <MenuItem value={2}>Пам’ятники</MenuItem>
                        <MenuItem value={3}>Музеї</MenuItem>
                        <MenuItem value={4}>Театри</MenuItem>
                        <MenuItem value={5}>Архітектура</MenuItem>
                        <MenuItem value={6}>Розваги</MenuItem>
                        <MenuItem value={7}>Зелені зони</MenuItem>
                    </Select>

                    <FormControlLabel sx={textFieldStyle}
                                      control={<Checkbox checked={isMainCarousel}
                                                         onChange={() => setIsMainCarousel(!isMainCarousel)}/>}
                                      label="Показувати в головній каруселі"/>
                    <FormControlLabel sx={textFieldStyle}
                                      control={<Checkbox checked={isRegionCarousel}
                                                         onChange={() => setIsRegionCarousel(!isRegionCarousel)}/>}
                                      label="Показувати в каруселі регіону"/>
                    <FormControlLabel sx={textFieldStyle}
                                      control={<Checkbox checked={famous} onChange={() => setFamous(!famous)}/>}
                                      label="Рекомендувати"/>
                    <Stack sx={textFieldStyle}>Регіон</Stack>
                    <Select
                        sx={selectStyle}
                        inputProps={{sx: {padding: '0 10px'}}}
                        value={region}
                        onChange={(e) => {
                            setRegion(e.target.value);
                        }}
                    >
                        {regions.map((item, i) => {
                            return <MenuItem key={i} value={i}>{item}</MenuItem>
                        })}
                    </Select>

                    <Button sx={saveButtonStyle} onClick={handleSave}>Зберегти</Button>
                </Stack>
            </Box>
        </Modal>
    </div>
}
