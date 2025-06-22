export function containsContactInfo(text: string): boolean {
  // Block phone numbers, emails, WhatsApp numbers
  const phoneRegex = /((\+92|0092)?\s?\d{3}[\s-]?\d{7})|((\d{4}[-\s]?){2,3}\d{3,4})/g;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const whatsappRegex = /(whatsapp|whtsapp|watsapp|wa\s*number|wa\s*no)/i;
  return (
    phoneRegex.test(text) ||
    emailRegex.test(text) ||
    whatsappRegex.test(text)
  );
} 