import type { ImageSourcePropType } from 'react-native';

import type { UniversityId } from '@/shared/constants/universities';

const universityLogoById: Record<UniversityId, ImageSourcePropType | null> = {
  'autonoma-peru': require('@/shared/assets/images/universities/Autonoma_logo.png'),
  'coming-soon': null,
};

export function getUniversityLogoById(
  universityId: UniversityId,
): ImageSourcePropType | null {
  return universityLogoById[universityId];
}