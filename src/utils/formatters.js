/**
 * Formats a number into Indian Rupee string format (e.g. ₹8,42,650)
 */
export function formatINR(amount = 0) {
  const rounded = Math.round(amount);
  return '₹' + rounded.toLocaleString('en-IN');
}

/**
 * Format compact numbers for quick tags (e.g. 10K, 25K)
 */
export function formatCompactINR(amount = 0) {
  if (amount >= 100000) {
    return '₹' + (amount / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  }
  if (amount >= 1000) {
    return '₹' + (amount / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return formatINR(amount);
}

/**
 * Generates reliable colorful avatar fallback or initials
 */
export function getInitials(name = '') {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Generates an avatar gradient based on string seed
 */
export function getAvatarGradient(name = '') {
  const gradients = [
    'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    'linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)',
    'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
    'linear-gradient(135deg, #5EE7DF 0%, #B490CA 100%)',
    'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
    'linear-gradient(135deg, #30CFD0 0%, #330867 100%)',
    'linear-gradient(135deg, #A8BFFF 0%, #884D80 100%)',
    'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)',
    'linear-gradient(135deg, #0BA360 0%, #3CBA92 100%)',
    'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}
