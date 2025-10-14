import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>welcome to s3 comm app</h1>
      <Link href="/create">create product</Link>
    </div>
  );
}
