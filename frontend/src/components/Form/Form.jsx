import { Grid , TextField, Button, Box} from "@mui/material";
import { useFormik } from 'formik';
import { useCreateWallet } from "../../hooks/useWallets";
import validationsForm from "./validations/validations";

const Form = ({handleClose}) => {
  const {mutate} = useCreateWallet()

  const formik = useFormik({
    initialValues: {
      address: "",
      USD: 1.32,
      EURO: 1.32,
    },
    validationSchema: validationsForm,
    onSubmit: (values) => {
      mutate(values)
      handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justify="center" direction="column" rowSpacing={2}>
        <Grid item xs="auto" textAlign={"center"}>
          Add your wallet!
        </Grid>
        <Grid item>
          <TextField
            id="address-input"
            name="address"
            label="Wallet Address"
            type="text"
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs="auto">
          Exchanges Rates:
        </Grid>
        <Grid item marginLeft={5}>
          <TextField
            id="usd-input"
            name="USD"
            label="USD"
            type="number"
            value={formik.values.USD}
            onChange={formik.handleChange}
            error={formik.touched.USD && Boolean(formik.errors.USD)}
            helperText={formik.touched.USD && formik.errors.USD}
          />
        </Grid>
        <Grid item marginLeft={5}>
          <TextField
            id="euro-input"
            name="EURO"
            label="EURO"
            type="number"
            value={formik.values.EURO}
            onChange={formik.handleChange}
            error={formik.touched.EURO && Boolean(formik.errors.EURO)}
            helperText={formik.touched.EURO && formik.errors.EURO}
          />
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            p: 1,
            mt: 5,
          }}
        >
        <Button variant="contained" color="primary" type="submit">
            Add
        </Button>
      </Box>
      </Grid>
    </form>
  );
};
export default Form;
