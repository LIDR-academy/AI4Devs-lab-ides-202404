export interface Candidato {
  id?: number;
  nombre: string;
  apellido: string;
  correo_electronico: string;
  telefono?: string;
  direccion?: string;
  educaciones?: Educacion[];
  experiencias?: ExperienciaLaboral[];
  documentos?: Documento[];
}

export interface Educacion {
  id?: number;
  candidato_id: number;
  institucion: string;
  titulo: string;
  fecha_inicio: Date;
  fecha_fin?: Date;
}

export interface ExperienciaLaboral {
  id?: number;
  candidato_id: number;
  empresa: string;
  titulo: string;
  descripcion: string;
  fecha_inicio: Date;
  fecha_fin?: Date;
}

export interface Documento {
  id?: number;
  candidato_id: number;
  tipo_documento: string;
  ruta_archivo: string;
}

