import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string().email('Please enter a valid email address');

// Password validation schema with requirements
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Name validation schema
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters');

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Signup form schema
export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset password form schema
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Server-side validation schemas (without confirmPassword)
export const serverLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const serverSignupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const serverForgotPasswordSchema = z.object({
  email: emailSchema,
});

export const serverResetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
});
