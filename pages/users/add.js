import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { usersAtom } from "@/store";

export default function AddUser() {
  const router = useRouter();
  const [users, setUsers] = useAtom(usersAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", email: "" } });

  function onSubmit(data) {
    const maxId = Math.max(...users.map((user) => user.id));
    const newUser = { id: maxId + 1, name: data.name, email: data.email };
    setUsers([...users, newUser]);
    router.push("/");
  }

  return (
    <>
      <h1 className="mb-4">Add User</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name", { required: "Name is required" })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email", { required: "Email is required" })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="me-2">Add User</Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Cancel
        </Button>
      </Form>
    </>
  );
}