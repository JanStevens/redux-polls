export function getPercentage(count: number, total: number): number {
  return total === 0 ? 0 : (count / total) * 100
}

export function getTextKeys() {
  return ['aText', 'bText', 'cText', 'dText']
}

export function getVoteKeys() {
  return ['aVotes', 'bVotes', 'cVotes', 'dVotes']
}
