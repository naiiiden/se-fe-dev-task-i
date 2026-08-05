import { useForm } from "react-hook-form";
import { LoginSchema, type LoginSchemaType } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "../../../utils/auth";
import { Input, Label, Button } from "@fluentui/react-components";

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = () => {
    login();
    navigate("/table");
  };

  if (isAuthenticated()) {
    return <Navigate to="/table" replace />;
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="space-y-6 w-full max-w-md bg-white p-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="username" required>
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-xs text-red-600">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password" required>
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            appearance="primary"
            disabled={!form.formState.isValid}
            className="w-full mt-2"
          >
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
