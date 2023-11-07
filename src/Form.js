import * as yup from 'yup'

const form = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, "name must be at least 2 characters"),
 
  size: yup
    .string()
    .oneOf(['small', 'medium', 'large', 'xl', ], 'Choose a size'),

  peperoni:yup
  .boolean(),
  cheese: yup
  .boolean(),
  olives: yup
  .boolean(),
  onion: yup
  .boolean(),
  specialInstructions: yup
  .string()
  .trim(),
})

export default form;