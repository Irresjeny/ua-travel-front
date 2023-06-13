import {TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import {config} from "../../config";
import {useHistory} from "react-router-dom";

const textFieldStyle = {
    minWidth: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px'
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


export default function Authentication() {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const history = useHistory();

    const handleSave = () => {
        fetch(`${config.host}/admin/login/`, {
            method: 'Post', // или 'PUT'
            headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                'user_name': login,
                'login_name': pass,
            })
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    sessionStorage.setItem('token', data)
                    history.push('/admin/orders', {from: "/admin/authentication"})
                })
            }
        })
    }

    return <div>
        <TextField size="small" sx={textFieldStyle} label={'Логін'} onChange={(e) => setLogin(e.target.value)}/>
        <TextField type="password" size="small" sx={textFieldStyle} label={'Пароль'} onChange={(e) => setPass(e.target.value)}/>
        <Button sx={saveButtonStyle} onClick={handleSave}>Увійти</Button>
    </div>
}
