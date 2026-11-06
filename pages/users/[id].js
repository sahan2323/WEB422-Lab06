import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { usersAtom } from "@/store";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [users, setUsers] = useAtom(usersAtom);

  const user = users.find((u) => u.id === Number(id));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // fill the form once the user is found
  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email });
  }, [user, reset]);

  function onSubmit(data) {
    setUsers(
      users.map((u) => (u.id === user.id ? { ...u, ...data } : u))
    );
    router.push("/");
  }

  if (!id) return null;
  if (!user) return <p>User not found.</p>;

  return (
    <>
      <h1 className="mb-4">Edit User</h1>

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

        <Button type="submit" className="me-2">Save</Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Cancel
        </Button>
      </Form>
    </>
  );
}