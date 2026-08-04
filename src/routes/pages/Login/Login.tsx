import { useForm } from "react-hook-form";
import { LoginSchema, type LoginSchemaType } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { login } from "../../../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = () => {
    login();
    navigate("/table");
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          {...form.register("username")}
        />
        {form.formState.errors.username && (
          <p>{form.formState.errors.username.message}</p>
        )}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p>{form.formState.errors.password.message}</p>
        )}
        <button disabled={!form.formState.isValid}>Login</button>
      </form>
    </main>
  );
}
