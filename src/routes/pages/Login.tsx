export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username" />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <button>Login</button>
      </form>
    </main>
  );
}
