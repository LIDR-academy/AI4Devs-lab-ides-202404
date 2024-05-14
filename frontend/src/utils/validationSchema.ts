import * as yup from 'yup';

export const candidateValidationSchema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  apellido: yup.string().required('El apellido es obligatorio'),
  correo_electronico: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  telefono: yup.string().optional().matches(/^[0-9]+$/, 'El teléfono debe ser numérico').min(10, 'El teléfono debe tener al menos 10 dígitos').max(15, 'El teléfono debe tener máximo 15 dígitos'),
  direccion: yup.string().optional(),
  educaciones: yup.array().optional().of(
    yup.object().shape({
      institucion: yup.string().required('La institución es obligatoria'),
      titulo: yup.string().required('El título es obligatorio'),
      fecha_inicio: yup.date().required('La fecha de inicio es obligatoria').typeError('La fecha de inicio debe ser una fecha válida'),
      fecha_fin: yup.date().optional().typeError('La fecha de finalización debe ser una fecha válida'),
    })
  ),
  experiencias: yup.array().optional().of(
    yup.object().shape({
      empresa: yup.string().required('La empresa es obligatoria'),
      titulo: yup.string().required('El título es obligatorio'),
      descripcion: yup.string().required('La descripción es obligatoria'),
      fecha_inicio: yup.date().required('La fecha de inicio es obligatoria').typeError('La fecha de inicio debe ser una fecha válida'),
      fecha_fin: yup.date().optional().typeError('La fecha de finalización debe ser una fecha válida'),
    })
  ),
  documentos: yup.array().optional().of(
    yup.object().shape({
      tipo_documento: yup.string().required('El tipo de documento es obligatorio'),
      ruta_archivo: yup.string().required('La ruta del archivo es obligatoria'),
    })
  ),
});

