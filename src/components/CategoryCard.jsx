import {Button, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const test ={
    cursor:'pointer',
    ':hover': {
        backgroundColor: '#ffdc00',
    },
}

export default function CategoryCard({category}) {
    const history = useHistory();
    const isMobile = useMediaQuery({ maxWidth: 600 })

    const buttonStyle={
        position:'absolute',
        backgroundColor:'#1970F2',
        color:'white',
        fontFamily:'DniproCity',
        fontWeight:'bold',
        fontSize:isMobile?'10px':'18px',
        padding: isMobile?'4px 20px':'10px 25px',
        borderRadius: '150px',
        left:'130px',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        }
    }

    return <Stack minWidth={isMobile?'250px':'300px'} maxWidth={isMobile?'250px':'300px'} maxHeight={isMobile?'250px':'400px'} border={'1px solid black'} borderRadius={'20px'}
                  alignItems={'flex-start'} marginRight={'auto'} sx={test} marginBottom={'20px'} onClick={()=>{history.push(`/category/${category.id}`)}}>
        <img style={{overflow: 'hidden', borderRadius: '20px', marginTop: '3%', marginLeft:'5%', height:isMobile?'80%':'85%', objectFit: 'contain'}} width={'90%'}
             src={category.image}/>
        <Stack textAlign={'start'} position={'relative'} marginLeft={'5%'}>
            <Stack maxHeight={isMobile?'2.5em':'2.7em'} fontSize={isMobile?16:24} fontWeight={700} sx={{overflowY:'hidden', width:'100%', marginRight:'5%'}}  >
                {category.name}
            </Stack>
        </Stack>


    </Stack>
}
