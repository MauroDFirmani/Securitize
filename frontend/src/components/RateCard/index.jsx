import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {EditRounded, DoneRounded, Close } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState, useEffect, useCallback } from 'react';
import { useUpdateWallet } from '../../hooks/useWallets';

export default function RateCard({exchangeRate:{currency, value}, address, refetch }) {
  const [isEdit, setIsEdit] = useState(false)
  const [auxValue, setAuxValue] = useState(value)
  const { mutateAsync } = useUpdateWallet()
  
  useEffect(() => {
    setAuxValue(value)
  }, [value])
  

  const handleChange=useCallback((e)=>{
    if(e.target.value>=0){
      setAuxValue(e.target.value)
    }
  },[])

  const handleDone=useCallback(()=>{
    setIsEdit(!isEdit)
    const newExchangeRate ={currency, value: auxValue}
    mutateAsync({address, newExchangeRate})
    refetch()
  },[address, auxValue, currency, isEdit, mutateAsync, refetch])

  const handleCancel=useCallback(()=>{
    setAuxValue(value)
    setIsEdit(!isEdit)
  },[isEdit, value])

  return (
    <Card sx={{ minWidth: "100%", background: "#f8f8f8", minHeight: "150px"}}>
      <CardContent style={{ display: "flex", flexDirection: "column"}}>
          <div style={{ display: "flex", justifyContent: "flex-end"}}>
            {isEdit?
              <>
                <Close onClick={handleCancel} sx={{ color: red[500], marginRight: "12px" }} fontSize="inherit" />
                <DoneRounded onClick={handleDone} color="success" fontSize="inherit" />
              </>
              :<EditRounded onClick={()=> setIsEdit(!isEdit)} color="primary" fontSize="inherit" />
            }
          </div>
        <TextField
          id="rate"
          style={{marginTop: "20px"}}
          inputProps={{ 
            type: 'number',
            min: 0,
          }}
          value={auxValue}
          fullWidth
          size="small"
          disabled={!isEdit}
          onChange={handleChange}
          onWheel={event => event.target.blur()}
      />
      </CardContent>
    </Card>
  );
}
