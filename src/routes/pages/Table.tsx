import { AUTH_KEY } from "../../utils/auth";

export default function Table() {
  console.log(1, localStorage.getItem(AUTH_KEY));

  return <p className="text-9xl">tablica</p>;
}
