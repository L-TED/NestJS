/**
 * 티어 이름에 따라 이모지를 반환하는 함수
 */
export function getTierEmoji(tierName: string | undefined | null): string {
  if (!tierName) return '';
  
  const name = tierName.toLowerCase().trim();
  
  if (name.includes('브론즈') || name.includes('bronze')) {
    return '🥉';
  }
  if (name.includes('실버') || name.includes('silver')) {
    return '🥈';
  }
  if (name.includes('골드') || name.includes('gold') || name.includes('고트')) {
    return '🐐';
  }
  
  return '';
}

/**
 * 티어 이름과 이모지를 함께 반환하는 함수
 */
export function formatTierName(tierName: string | undefined | null): string {
  if (!tierName) return '-';
  const emoji = getTierEmoji(tierName);
  return emoji ? `${emoji} ${tierName}` : tierName;
}

