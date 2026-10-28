import { z } from "zod";

// 1. Define the User schema
const UserSchema = z.object({
  name: z.string(),
});

// 2. Define the Discriminated Union schema
export const RequestStateSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("loading") }),
  z.object({ status: z.literal("success"), data: UserSchema }),
  z.object({ status: z.literal("error"), error: z.instanceof(Error) }),
]);

// 3. Automatically extract the TypeScript type from the schema!
export type RequestState = z.infer<typeof RequestStateSchema>;
export type User = z.infer<typeof UserSchema>;

function assertNever(value: never): never {
  throw new Error(`Unhandled request state: ${JSON.stringify(value)}`);
}

function handleRequestState(state: RequestState): string {
  switch (state.status) {
    case "loading":
      return "Page is loading";

    case "success":
      return `Page loaded with data: ${state.data.name}`;

    case "error":
      return `Page has an error: ${state.error.message}`;

    default:
      return assertNever(state);
  }
}

function processIncomingData(rawData: unknown):string {
  // .safeParse checks the structure at runtime without throwing errors
  const result = RequestStateSchema.safeParse(rawData);

  if (!result.success) {
    // 🛑 The data is malformed! Handle the error gracefully.
    console.error("Invalid structural data received:", result.error.format());
    return "Error: System received bad data.";
  }

  // ✅ The data is 100% valid! 
  // 'result.data' is automatically typed as your RequestState union.
  return handleRequestState(result.data);
}

console.log(
  processIncomingData({
    status: "success",
    data: { name: "Ava" },
  })
);