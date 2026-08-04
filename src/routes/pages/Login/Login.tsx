import { useForm } from "react-hook-form";
import { LoginSchema, type LoginSchemaType } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = () => {
    navigate("/table");
  };

  console.log(1, form);
  console.log(2, form.formState);

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
        {form.formState.errors.username && (
          <p>{form.formState.errors.username.message}</p>
        )}
        <button>Login</button>
      </form>
    </main>
  );
}
