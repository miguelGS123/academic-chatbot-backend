export const universities = [
  {
    id: 'autonoma-peru',
    name: 'Autónoma del Perú',
    fullName: 'Universidad Autónoma del Perú',
    enabled: true,
  },
  {
    id: 'coming-soon',
    name: 'Próximamente',
    fullName: 'Próximamente',
    enabled: false,
  },
] as const;

export type University = (typeof universities)[number];

export type UniversityId = University['id'];