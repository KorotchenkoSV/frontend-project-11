import * as yup from 'yup'

export default yup.string().url('invalidURL').required('required')
