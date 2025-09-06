import * as Yup from 'yup';

export const reportFormSchema = Yup.object().shape({
  expenseName: Yup.string().required('El nombre es un campo requerido'),
  hasFixedPrice: Yup.boolean(),
  reportTotal: Yup.number().when('hasFixedPrice', {
    is: true,
    then: (schema) => schema.required('El total es un campo requerido').min(1, 'El total no puede ser cero'),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
});

export const reportInitialValues = {
  expenseName: '',
  hasFixedPrice: false,
  reportTotal: undefined,
};
