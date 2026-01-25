import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore.js";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function SignupForm({ className, ...props }) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, displayName, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Nhập lại mật khẩu không đúng");
      return;
    }

    await signUp(username, password, displayName);
    navigate("/signin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Đăng ký</CardTitle>
          <CardDescription>
            Hãy điền đầy đủ thông tin và trải nghiệm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="displayName">Họ và tên</FieldLabel>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="Huỳnh Chí Đạt"
                  required
                  value={formData.displayName}
                  onChange={handleChangeForm}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Tên tài khoản</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="huynhdat05tv"
                  required
                  value={formData.username}
                  onChange={handleChangeForm}
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChangeForm}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Nhập lại mật khẩu
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChangeForm}
                    />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit" variant="blue">
                  Đăng ký
                </Button>
                <FieldDescription className="text-center">
                  Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
