import { Box, Modal, Fade, IconButton } from '@mui/material';
import { CloseRounded }from '@mui/icons-material';
import UseFormControl from '../Form';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f8f8f8',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WalletModal({open, handleClose}) {
  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <IconButton  onClick={handleClose}  color="inherit">
                <CloseRounded fontSize='sm'/>
              </IconButton>
            </Box>
            <UseFormControl handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
  );
}