import {Stack} from "@mui/material";
import Button from '@mui/material/Button';
import React, {useEffect, useLayoutEffect, useState} from "react";
import {config} from "../../config";
import ModalCreateEdit from "../Categories/ModalCreateEdit";
import ModalDelete from "../Categories/ModalDelete";
import {useHistory} from "react-router-dom";
import AdminNavBar from "../AdminNavBar";
import AdminHeader from "../AdminHeader";
import {allCategory} from "../../data/category";
import {DataGrid} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useMediaQuery} from "react-responsive";

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

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(0)
    const [flag, setFlag] = useState(0)
    const [name, setName] = useState('')
    const [deleteOpen, setDeleteOpen] = useState(false)
    const history = useHistory();

    useLayoutEffect(() => {
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
                    setCategories(data.category)
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/categories"})
            }
        })
        // setCategories(allCategory)

    }, [flag])

    const columns = [
        {field: 'id', headerName: 'ID', flex: 1 },
        {field: 'name', headerName: 'Назва', flex: 1 },
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
                }}><EditIcon sx={iconStyle} /></Stack>
                <Stack><DeleteIcon sx={iconStyle} onClick={()=>{
                    setName(params.row.name)
                    setId(params.row.id)
                    setDeleteOpen(true)}} /></Stack>
            </Stack>
        },
    ];

    const getRow = () => {
        let result = [];
        for (let i = 0; i < categories.length; i++) {
            result.push({
                id: categories[i].id,
                name:categories[i].name,
                action: categories[i]
            })
        }
        return result
    }

    return <Stack direction={'row'}>
        <AdminNavBar active={'Categories'}/>
        <Stack direction={'column'} width={'100%'}>
            <AdminHeader/>
            <ModalDelete open={deleteOpen} setOpen={setDeleteOpen} name={name} id={id} flag={flag} setFlag={setFlag}/>
            <ModalCreateEdit open={open} setOpen={setOpen} id={id} setId={setId} flag={flag} setFlag={setFlag}/>
            <Stack style={categoriesStyle}>
                <Stack style={{width: '98%', marginLeft: '1%'}} direction={'row'} justifyContent={'space-between'}
                       alignItems={'baseline'}>
                    <Stack style={{fontSize: 30, marginBottom: 20, marginLeft: 20}}>Категории</Stack>
                    <Button sx={addCategoryButton} onClick={() => {
                        setId(0)
                        setOpen(true);
                    }}>Додати категорію</Button>
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
