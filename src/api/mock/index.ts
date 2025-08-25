import type { LoginRequest, LoginResponse } from "../../types/login";
import type { User } from "../../types/user";
import { sleep } from "../../utils/sleep";

const MOCK_USERS: User[] = [
  {
    id: 1,
    email: "test@example.com",
    password: "1234",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin",
  },
  {
    id: 3,
    email: "user@test.com",
    password: "password",
  },
];

export async function mockLoginRequest({
  email,
  password,
}: LoginRequest): Promise<LoginResponse | never> {
  await sleep(Math.random() * 1000 + 500);

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user: User | undefined = MOCK_USERS.find(
    (user) => user.email === email
  );

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch: boolean = user.password === password;

  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  return {
    data: { user },
  };
}
