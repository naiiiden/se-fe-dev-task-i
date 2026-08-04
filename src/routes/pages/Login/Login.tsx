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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...form.register("password")}
        />
        <button>Login</button>
      </form>
    </main>
  );
}
