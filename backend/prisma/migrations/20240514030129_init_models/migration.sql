-- CreateTable
CREATE TABLE "Candidato" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo_electronico" TEXT NOT NULL,
    "telefono" VARCHAR(15),
    "direccion" TEXT,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Educacion" (
    "id" SERIAL NOT NULL,
    "candidato_id" INTEGER NOT NULL,
    "institucion" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),

    CONSTRAINT "Educacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienciaLaboral" (
    "id" SERIAL NOT NULL,
    "candidato_id" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),

    CONSTRAINT "ExperienciaLaboral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "candidato_id" INTEGER NOT NULL,
    "tipo_documento" VARCHAR(50) NOT NULL,
    "ruta_archivo" TEXT NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_correo_electronico_key" ON "Candidato"("correo_electronico");

-- AddForeignKey
ALTER TABLE "Educacion" ADD CONSTRAINT "Educacion_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
