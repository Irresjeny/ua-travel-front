import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {MenuItem, Select, Stack, TextField} from "@mui/material";
import {useHistory} from "react-router-dom";
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

const saveButtonStyle = {
    color: 'white',
    backgroundColor: 'rgb(45, 3, 59)',
    ':hover': {
        backgroundColor: 'rgba(45,3,59,0.75)',
    },
    textTransform: 'none',
    fontSize: 20,
    minWidth: 50,
    width: '30%',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    height: '40px',
}

export default function ModalDelete({open, setOpen, id, name, flag, setFlag}) {
    const history = useHistory();

    const handleAccept = () => {
        fetch(`${config.host}/admin/places/${id}`, {
            method:'DELETE',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token': sessionStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/places"})
            } else {
                console.log(response)
                setOpen(false)
                setFlag(flag + 1)
            }
        })
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
                    style={{marginTop: 10, fontSize: 25, marginBottom: 20}} alignItems={'center'}>Видалити пам'ятку {name}?</Stack>
                <Stack flexDirection={'row'} justifyContent={'center'}>
                    <Button sx={saveButtonStyle} onClick={handleAccept}>Так</Button>
                    <Button sx={saveButtonStyle} onClick={()=>setOpen(false)}>Ні</Button>
                </Stack>
            </Box>
        </Modal>
    </div>
}
