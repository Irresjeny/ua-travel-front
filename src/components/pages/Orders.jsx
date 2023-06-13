import {Stack} from "@mui/material";
import Button from '@mui/material/Button';
import React, {useEffect, useLayoutEffect, useState} from "react";
import {config} from "../../config";
import ModalCreateEdit from "../Orders/ModalCreateEdit";
import {useHistory} from "react-router-dom";
import AdminNavBar from "../AdminNavBar";
import AdminHeader from "../AdminHeader";
import {DataGrid} from "@mui/x-data-grid";
import {ALLOrders} from "../../data/order";
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const categoriesStyle = {
    minHeight: window.innerHeight,
    borderBottom: 0,
    height: '100%',
    backgroundColor: 'rgb(217,217,218)',
    alignItems: 'start',
    padding: 20
}

const categoriesBlockStyle = {
    marginLeft: '1%',
    display: 'flex',
    backgroundColor: 'white',
    width: '98%',
}

const addCategoryButton = {
    color: 'white',
    backgroundColor: 'rgb(44 140 213)',
    ':hover': {
        backgroundColor: '#FFE545',
    },
    textTransform: 'none',
    fontSize: 20
}

const iconStyle = {
    '&:hover': {
        color: 'rgb(107,105,105)',
    },
}

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(0)
    const [flag, setFlag] = useState(0)
    const [name, setName] = useState('')
    const history = useHistory();


    useLayoutEffect(() => {
        fetch(`${config.host}/admin/orders/`, {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token': sessionStorage.getItem('token')
            },
        }).then((response) => {
            if (response.status === 200) {
                response.text().then((data) => {
                    let res = JSON.parse(data.replace(/\bNaN\b/g, "null"));
                    setOrders(res.category)
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/categories"})
            }
        })

    }, [flag])


    const doneHandle = () => {
        let temp = orders;
        temp[id].status = 'done';
        setOrders(temp);
    }

    const columns = [
        {field: 'id', headerName: 'ID', flex: 1 },
        {field: 'name', headerName: 'Ім\'я', flex: 1 },
        {field: 'surname', headerName: 'Фамілія', flex: 1 },
        {field: 'phone', headerName: 'Номер', flex: 1 },
        {field: 'email', headerName: 'Пошта', flex: 1 },
        {field: 'status', headerName: 'Статус', flex: 1 },
        {
            field: 'action',
            headerName: 'Дії',
            flex: 1,
            sortable: false,
            renderCell: (params)=><Stack
                direction={"row"} justifyContent={'space-evenly'}>
                <Stack onClick={() => {
                    setId(params.row.id)
                    setOpen(true);
                }}><DescriptionIcon sx={iconStyle} /></Stack>
                <Stack display={params.row.status==='В обробці'?'flex':'none'} onClick={() => {
                    setId(params.row.id)
                    doneHandle()
                }}><DoneIcon sx={iconStyle} /></Stack>
                <Stack display={params.row.status==='В обробці'?'flex':'none'} onClick={() => {
                    setId(params.row.id)
                    setOpen(true);
                }}><HighlightOffIcon sx={iconStyle} /></Stack>
            </Stack>
        },
    ];

    const getRow = () => {
        let result = [];
        for (let i = 0; i < orders?.length; i++) {
            result.push({
                id: orders[i].id,
                name:orders[i].name,
                surname:orders[i].surname,
                phone:orders[i].phone,
                email:orders[i].email,
                status:orders[i].status,
                action: orders[i]
            })
        }
        return result
    }

    return <Stack direction={'row'}>
        <AdminNavBar active={'Orders'}/>
        <Stack direction={'column'} width={'100%'}>
            <AdminHeader/>
            <ModalCreateEdit open={open} setOpen={setOpen} id={id} flag={flag} setFlag={setFlag}/>
            <Stack style={categoriesStyle}>
                <Stack style={{width: '98%', marginLeft: '1%'}} direction={'row'} justifyContent={'space-between'}
                       alignItems={'baseline'}>
                    <Stack style={{fontSize: 30, marginBottom: 20, marginLeft: 20}}>Замовлення</Stack>
                </Stack>
                <Stack style={categoriesBlockStyle}>
                    <DataGrid
                        width={'100%'}
                        rows={getRow()}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 5},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </Stack>
            </Stack>
        </Stack>

    </Stack>
}
