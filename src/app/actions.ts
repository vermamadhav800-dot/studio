'use server';

import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactMessage(formData: unknown) {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: 'Invalid data provided.' };
  }

  const { name, email, message } = parsed.data;

  // In a real application, you would send an email here.
  // For this example, we'll just log it to the console.
  console.log('New contact message received:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always return success for this example
  return { success: true };
}
