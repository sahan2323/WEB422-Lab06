import Link from "next/link";
import { useAtom } from "jotai";
import { ListGroup, Button } from "react-bootstrap";
import { usersAtom } from "@/store";

export default function Home() {
  const [users] = useAtom(usersAtom);

  return (
    <>
      <h1 className="mb-4">Users</h1>

      <ListGroup className="mb-3">
        {users.map((user) => (
          <ListGroup.Item
            key={user.id}
            action
            as={Link}
            href={`/users/${user.id}`}
          >
            <strong>{user.name}</strong> — {user.email}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button as={Link} href="/users/add">
        Add User
      </Button>
    </>
  );
}