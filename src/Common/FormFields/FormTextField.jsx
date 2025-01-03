import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const FormTextField = ({ field, ...props }) => {
  const { values, errors, touched, handleChange } = useFormikContext();

  return (
    <TextField
      name={field}
      value={values[field]}
      onChange={handleChange}
      error={touched[field] && Boolean(errors[field])}
      helperText={touched[field] && errors[field]}
      fullWidth
      variant="outlined"
      
      sx={{
        fontSize: '12px',
        '& .MuiOutlinedInput-root': {
          height: '40px',
         fontWeight:'600',
          '& input': {
            height: '100%',
            '&::placeholder': {
              fontSize: '12px',
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default FormTextField;
