export const universities = [
  {
    id: 'autonoma-peru',
    name: 'Autónoma del Perú',
    enabled: true,
  },
  {
    id: 'coming-soon',
    name: 'Próximamente',
    enabled: false,
  },
] as const;

export type UniversityId = (typeof universities)[number]['id'];