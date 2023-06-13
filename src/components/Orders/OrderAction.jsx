import {Stack} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";


const iconStyle = {
    '&:hover': {
        color: 'rgb(107,105,105)',
    },
}

export default function OrderAction(orders, setId, setName, setOpen){
    return orders.map((item, i) => (
            <Stack key={i}
                   direction={"row"} justifyContent={'space-evenly'}>
                <Stack><CloudDownloadIcon sx={iconStyle} onClick={() => {
                    setId(item.id)
                    setName(item.name)
                }}/></Stack>
            </Stack>
        ))
}
