import * as yup from "yup";

const validationsForm = yup.object().shape({
  address: yup
    .string()
    .trim()
    .lowercase()
    .matches(/^0x[a-fA-F0-9]{40}$/g, 'Invalid address')
    .required("Required"),
  USD: yup.number().positive().required("Required"),
  EURO: yup.number().positive().required("Required"),
});

export default validationsForm;
