// Simple in-memory rate limiting (in production, use Redis or similar)
const resetAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = resetAttempts.get(email);
  
  if (!attempts) {
    resetAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset counter if more than 1 hour has passed
  if (now - attempts.lastAttempt > 3600000) {
    resetAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Allow max 3 attempts per hour
  if (attempts.count >= 3) {
    return false;
  }
  
  attempts.count++;
  attempts.lastAttempt = now;
  return true;
} 