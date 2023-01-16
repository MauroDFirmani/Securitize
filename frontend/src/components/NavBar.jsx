import { useState } from 'react';
import {AppBar, Box, Toolbar, IconButton, Tooltip } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WalletModal from './Modal';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            <Tooltip title="Add Wallet">
                <IconButton  onClick={handleOpen}  color="inherit">
                    <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <WalletModal open={open} handleClose={handleClose} />
    </Box>
  );
}