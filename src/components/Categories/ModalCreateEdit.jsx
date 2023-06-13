import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {allCategory} from "../../data/category";
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

const quillStyle = {
    minWidth: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    zIndex: 1000
}

const imageStyle = {
    maxWidth: '60%',
    maxHeight: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
}

export default function ModalCreateEdit({open, setOpen, id, setId, flag, setFlag}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [sex, setSex] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if (id) {
            fetch(`${config.host}/admin/category/${id}`, {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setName(data.category.name)
                        setImage(data.category.image)
                        setSex(data.category.sex)
                    })
                } else if (response.status === 401) {
                    history.push('/admin/authentication', {from: "/admin/categories"})
                }
            })
        } else {
            setName('')
            setImage('')
            setSex(false)
        }
    }, [id])


    const handleSave = () => {
        if (id) {
            fetch(`${config.host}/admin/category/${id}`, {
                method: 'PUT', // или 'PUT'
                headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    'category_name': name,
                })
            }).then((response) => {
                if(response.status === 401){
                    history.push('/lilshop/authentication', {from: "/lilshop/categories"})
                }
                else {
                    response.json().then((data) => {
                        setOpen(false)
                        setName('')
                        setImage('')
                        setSex(false)
                        setFlag(flag+1)
                    })
                }
            })
        } else {
            fetch(`${config.host}/admin/category/`, {
                method: 'POST', // или 'PUT'
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    'name': name,
                    'image': image,
                    'sex': sex,
                })
            }).then((response) => {
                if(response.status === 401){
                    history.push('/lilshop/authentication', {from: "/lilshop/categories"})
                }
                else {
                    response.json().then((data) => {
                        setOpen(false)
                        setName('')
                        setImage('')
                        setSex(false)
                        setFlag(flag+1)
                    })
                }
            })
        }
    }

    const close = () => {
        setOpen(false)
        setName('')
        setImage('')
        setSex(false)
        setId(0)
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
                    alignItems={'center'}>{id ? 'Редагувати категорію' : 'Додати категорію'}</Stack>
                <Stack>
                    <TextField value={name} size="small" sx={textFieldStyle} label={'Назва'}
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField size="small" value={image} sx={textFieldStyle} label={'Зображення'}
                               onChange={(e) => setImage(e.target.value)}/>
                    <FormControlLabel sx={textFieldStyle}
                                      control={<Checkbox checked={sex} onChange={() => setSex(!sex)}/>}
                                      label="Є стать"/>
                    <Button sx={saveButtonStyle} onClick={handleSave}>Зберегти</Button>
                </Stack>
            </Box>
        </Modal>
    </div>
}
