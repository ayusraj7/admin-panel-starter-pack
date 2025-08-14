"use client"
import api from "./api";

type loginFormValues = {
  email: string;
  password: string;
};

export async function loginService(values: loginFormValues,router:any): Promise<void> {
  try {
    const result = await api.post("/api/admin/auth/login", values);
    console.log('result',result?.data?.data);
    debugger;
    if (result?.data?.success) {
      // handle success
      localStorage.setItem("token",result.data?.data?.accessToken);
      localStorage.setItem("user",JSON.stringify(result?.data?.data?.user))
      router.push("/dashboard")
    }
  } catch (error) {
    // handle error
    console.log('error',error);
  }
}
