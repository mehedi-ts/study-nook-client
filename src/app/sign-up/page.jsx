"use client";
import { Card } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "../../../lib/auth-client";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const userData = Object.fromEntries(fromData.entries());
    const { email, password, image, name } = userData;
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      callbackURL: "/",
    });
    console.log(data, error);
  };
  return (
    <div className="max-w-7xl mx-auto w-full h-180 flex items-center justify-center border flex-col ">
      <h1 className="text-4xl font-bold mb-5">Sign up</h1>
      <Card className="border w-fit mx-auto">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="John dho" required />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField isRequired name="image" type="text">
            <Label>Image Url</Label>
            <Input placeholder="Your image url" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button type="submit">SignUp</Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
