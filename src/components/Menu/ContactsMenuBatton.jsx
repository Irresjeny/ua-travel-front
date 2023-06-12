import {useEffect, useRef, useState} from "react";
import {Button, Menu, MenuItem, Stack} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as React from "react";
import {useMediaQuery} from "react-responsive";

export default function ContactsMenuButton() {
    const [anchorEl, setAnchorEl] = useState(0)
    const buttonRef = useRef(null);
    const open = Boolean(anchorEl);
    const [width, setWidth] = useState(100);
    const isMobile = useMediaQuery({maxWidth: 600})

    useEffect(() => {
        if (buttonRef) {
            setWidth(buttonRef.current.offsetWidth)
        }
    }, [buttonRef, open])
    const handleClick = (e) => {
        if (open) {
            setAnchorEl(null);
        } else {
            setAnchorEl(e.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const buttonStyle = {
        width:isMobile?'150px':'200px',
        height: '60px',
        backgroundColor: 'white',
        color: 'black',
        // borderRadius: '34px',
        justifyContent: 'space-around',
        textTransform: 'none',
        fontSize: 20,
        zIndex: 3,
        ':hover': {
            backgroundColor: 'white',
        },
        ':active':{
            backgroundColor: 'white',
        },
    }

    return <Stack>
        <Button
            disableRipple
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={buttonStyle}
            ref={buttonRef}
        >
            Контакти
            <KeyboardArrowDownIcon sx={{marginRight: '15px', fontSize: '30px!important'}}/>
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
                'sx': {'minWidth': `${width}px`, 'maxWidth': `${width}px`, paddingTop: `70px`, paddingBottom: '20px'},
            }} sx={{top: `-60px`, zIndex: '1', borderRadius:'0', marginLeft:isMobile?'0':'10px'}}
        >
            <Stack alignItems={'center'}>uatravel@gmail.com</Stack>
            {/*<MenuItem  sx={itemStyle}>uatravel@gmail.com</MenuItem>*/}
            {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
        </Menu>
    </Stack>
}
