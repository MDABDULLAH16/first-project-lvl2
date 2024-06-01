import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password should not less then 20 characters' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
