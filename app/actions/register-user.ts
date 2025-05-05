"use server"
import bcrypt  // Replace 'bcrypt' with 'bcryptjs'
import { db } from "@/lib/db"
import { hash } from "bcrypt"
import { z } from "zod"
import { redirect } from "next/navigation"

// Define validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string[]
  }
  message?: string
}

export async function registerUser(prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  // Validate form data
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data. Please check the fields above.",
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        errors: {
          _form: ["A user with this email already exists"],
        },
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: new Date(), // Auto-verify for simplicity, remove for production
      },
    })

    // Redirect to sign-in page
    redirect("/auth/signin?registered=true")
  } catch (error) {
    console.error("Registration error:", error)
    return {
      errors: {
        _form: ["An error occurred during registration. Please try again."],
      },
    }
  }
}
