import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, Link, TextField, toast} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
   const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formInfo: Record<string, string> = {};

    formData.forEach((value, key) => {
      formInfo[key] = value.toString();
    });

    console.log("Form submitted with:", formInfo);


      const { error } = await authClient.signIn.email(
          {
            email: formInfo.email,
            password: formInfo.password,
          
          },
          {
            onRequest: () => {
              setLoading(true);
            },
            onSuccess: (ctx) => {
      setLoading(false);
      toast.success("Login successfully!");
      
      navigate("/");
    },
            onError: (ctx) => {
              setLoading(false);
              toast.danger(ctx.error.message);
            },
          }
        );
    
        if (error) {
          console.error(error);
        }
  };

  return (
    <div className="w-11/12 py-10 mx-auto">
        <Form
     className="mx-auto flex w-full max-w-96 flex-col gap-4 rounded-xl border border-border bg-bg-card p-6 text-text-dark "
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold text-text-dark">Welcome Back!</h1>

   

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
        <Label className="text-secondary">Email</Label>
        <Input
          placeholder="john@example.com"
          className="border border-border bg-bg-light text-text-dark placeholder:text-text-muted focus:border-accent focus:ring-accent"
        />
        <FieldError className="text-primary" />
      </TextField>

  

<div className="relative">
   <TextField
        isRequired
        minLength={8}
        name="password"
        type={showPassword ? 'text' : "password"}
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
        <Label className="text-secondary">Password</Label>
        <Input
          placeholder="Enter your password"
          className="border border-border bg-bg-light text-text-dark placeholder:text-text-muted focus:border-accent focus:ring-accent"
        />
        <Button
        variant="ghost"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark bg-transparent"
      >
        {showPassword ? <Eye /> : <EyeClosed/>}
      </Button>
        <Description className="text-text-muted">
          Must be at least 8 characters with 1 uppercase and 1 number
        </Description>
        <FieldError className="text-primary" />
      </TextField>
</div>
     

      <Button
        type="button"
        variant="secondary"
        className="flex items-center justify-center gap-2 border border-border bg-bg-light text-text-dark w-full hover:bg-border"
        onPress={() => console.log("Google login clicked")}
      >
        <Icon icon="devicon:google" />
        Continue with Google
      </Button>

      <div className="flex gap-2">
        <Button
          type="submit"
          className="flex-1 bg-primary text-bg-light hover:bg-secondary"
        >
          <Check />
          Login
        </Button>
        <Button
          type="reset"
          variant="secondary"
          className="flex-1 border border-border bg-bg-light text-text-dark hover:bg-border"
        >
          Reset
        </Button>
      </div>
    </Form>
    <p className="text-center text-secondary text-sm my-2">Don't Have Account? <span ><Link href="/Signup" className="text-primary">Signup</Link></span></p>
    </div>
  
  );
}