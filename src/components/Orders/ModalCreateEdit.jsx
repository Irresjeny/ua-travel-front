import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel, MenuItem, Rating, Select, Stack, TextField} from "@mui/material";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {allCategory} from "../../data/category";
import {ALLOrders} from "../../data/order";
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
    paddingLeft:'5%'
}


export default function ModalCreateEdit({open, setOpen, id}) {
    const [order, setOrder] = useState({goods:''})
    const history = useHistory();

    useEffect(() => {
        if(id !== 0){
            fetch(`${config.host}/admin/orders/${id}`, {
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
                        setOrder(res)
                    })
                } else if (response.status === 401) {
                    history.push('/admin/authentication', {from: "/admin/places"})
                }
            })
        }
    }, [id])

    return <div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Stack
                    style={{marginTop: 10, fontSize: 25}}
                    alignItems={'center'}>Подробиці</Stack>
                <Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                            id:&nbsp;
                        </Stack>
                        <Stack>
                            {order.id}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                              Товари:&nbsp;
                        </Stack>
                        <Stack>
                            {order.goods.split(';').map((good)=>{
                                return <Stack>{good}</Stack>
                            })}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                            Сумма:&nbsp;
                        </Stack>
                        <Stack>
                            {order.sum}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                            Ім'я:&nbsp;
                        </Stack>
                        <Stack>
                            {order.name}&nbsp;{order.surname}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                            Номер:&nbsp;
                        </Stack>
                        <Stack>
                            {order.phone}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                            Пошта:&nbsp;
                        </Stack>
                        <Stack>
                            {order.email}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack fontWeight={'bold'}>
                            Статус:&nbsp;
                        </Stack>
                        <Stack>
                            {order.status}
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    </div>
}
