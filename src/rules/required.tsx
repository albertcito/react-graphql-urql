export const required = (message: string) => ({
  required: true,
  message,
});

export const min = (minNumber: number, message: string) => ({
  minNumber,
  message,
});
