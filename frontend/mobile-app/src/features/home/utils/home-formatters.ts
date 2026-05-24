import {
  type UniversityId,
  universities,
} from '@/shared/constants/universities';

export function getUniversityIdByName(
  universityName?: string | null,
): UniversityId {
  const normalizedName = universityName?.trim().toLowerCase();

  const university = universities.find((item) => {
    return (
      item.name.toLowerCase() === normalizedName ||
      item.fullName.toLowerCase() === normalizedName
    );
  });

  return university?.id ?? 'autonoma-peru';
}

export function getInitials(fullName: string): string {
  const nameParts = fullName.trim().split(' ').filter(Boolean);

  if (nameParts.length === 0) {
    return 'U';
  }

  const firstInitial = nameParts[0]?.charAt(0) ?? '';
  const secondInitial = nameParts[1]?.charAt(0) ?? '';

  return `${firstInitial}${secondInitial}`.toUpperCase();
}

export function formatRole(role?: string | null): string {
  if (role === 'student') {
    return 'Alumno';
  }

  return role ?? 'Usuario';
}

export function formatCycle(cycle?: number | null): string {
  const cycleByNumber: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
  };

  if (!cycle) {
    return 'No registrado';
  }

  return cycleByNumber[cycle] ?? 'No registrado';
}