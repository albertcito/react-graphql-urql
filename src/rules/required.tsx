export const required = (message: string) => ({
  required: true,
  message,
});

export const min = (minNumber: number, message: string) => ({
  minNumber,
  message,
});

const type = (type_: string, message?: string) => ({
  type: type_,
  message: message ?? 'Email no valido',
});

export const email = (message?: string) => type('email', message);
