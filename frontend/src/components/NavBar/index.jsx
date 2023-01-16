import { useState } from 'react';
import {AppBar, Box, Toolbar, IconButton, Tooltip } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WalletModal from '../Modal';
import { useCallback } from 'react';

export function NavBar() {
  const [open, setOpen] = useState(false);
  const handleChange = useCallback(() => setOpen(prevState => !prevState),[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            <Tooltip title="Add Wallet">
                <IconButton  onClick={handleChange}  color="inherit">
                    <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <WalletModal open={open} handleClose={handleChange} />
    </Box>
  );
}