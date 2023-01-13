import { object, string, TypeOf } from "zod";

const createUserInputSchema = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(12, "password too short - should be 12 chars minimum"),
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
  })
}

const userInputSchema = createUserInputSchema.body.extend({
  passwordConfirmation: string({
    required_error: "passwordConfirmation is required",
  }),
});

const refinedUserInputSchema = userInputSchema.refine((data) => data.password === data.passwordConfirmation, {
  message: "passwords do not match",
  path: ["passwordConfirmation"],
})

export const createUserSchema = object({ body: refinedUserInputSchema });

const createUserInput = object(createUserInputSchema)
export type CreateUserInput = TypeOf<typeof createUserInput>












