import { Box, CircularProgress } from '@mui/material';

const withSpinner = (Component) => (props) => {
  const {isLoading, ...otherProps} = props;
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
      ) : (
        <Component {...otherProps} />
      )}
    </>
  );
};

export default withSpinner;