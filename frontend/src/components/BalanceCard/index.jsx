import { useState } from 'react';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { useCallback } from 'react';

export default function BalanceCard({currency, setCurrency, balance}) {
  
  const [state, setState] = useState(currency);
  
  const handleChange = useCallback((event) => {
    setState(event.target.value);
    setCurrency(event.target.value)
  },[setCurrency]);  

  return (
    <Card sx={{ minWidth: "100%", background: "#f8f8f8", minHeight: "150px" }}>
      <CardContent style={{ display: "flex", flexDirection: "column"}}>
        <FormControl sx={{ m: 1 }} size="small">
          <InputLabel id="demo-select-small">Currency</InputLabel>
          <Select
            style={{maxWidth: "50%"}}
            labelId="demo-select-small"
            id="demo-select-small"
            value={state}
            label="Currency"
            onChange={handleChange}
          >
            <MenuItem value={"EURO"}>EURO</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
        </FormControl>
        <div style={{ marginTop: "25px", marginLeft: "8px"}}>
          <Typography sx={{fontWeight: 'bold'}}>{balance ? balance[state] : ''}{state=== 'USD'? '$' : '€'}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}