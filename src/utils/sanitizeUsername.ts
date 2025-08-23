// Utility to generate a sanitized username from email
// Removes everything after '@', strips numbers, and non-letter characters

export function sanitizeUsernameFromEmail(email: string): string {
  // Get part before '@'
  const local = email.split('@')[0];
  // Remove numbers and non-letter characters, allow underscores
  const sanitized = local.replace(/[^a-zA-Z_]/g, '').toLowerCase();
  // Fallback if result is empty
  return sanitized || 'user';
}
