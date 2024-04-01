import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  return (
    <ul>
      <li>
        <Link href="/login" as="/login">
          Login
        </Link>
      </li>
      <li>
        <Link href="/register" as="/register">
          Register
        </Link>
      </li>
    </ul>
  );
}
