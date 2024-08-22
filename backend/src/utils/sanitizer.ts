import { escape } from 'validator';

export const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    return escape(input);
  } else if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  } else if (typeof input === 'object' && input !== null) {
    const sanitizedObject: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitizedObject[key] = sanitizeInput(value);
    }
    return sanitizedObject;
  }
  return input;
};
