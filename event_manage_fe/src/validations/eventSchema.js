import * as yup from 'yup'

export const eventSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be at most 1000 characters'),
  startTime: yup
    .date()
    .typeError('Start time is required')
    .required('Start time is required'),
  endTime: yup
    .date()
    .typeError('End time is required')
    .min(
      yup.ref('startTime'),
      'End time must be the same or after the start time'
    )
    .required('End time is required'),
  location: yup.string().required('Location is required'),
  visibility: yup
    .string()
    .oneOf(['PUBLIC', 'PRIVATE'], 'Invalid visibility')
    .required('Visibility is required'),
})
