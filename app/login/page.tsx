"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { customClasses } from "../../utils/customClasses";
import { loginSchema } from "../../utils/ValidationSchema";
import api from "../../service/api";

export default function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        // const { data } = await api.post("/auth/login", values);
        const data = {};
        // data.token="937kehkjhxeihkhiekheixhihiuhjhekhhekhkjh";
        // localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } catch (err: unknown) {
        let errorMessage = "An error occurred during login";
        if (typeof err === "object" && err !== null && "response" in err) {
          // @ts-expect-error: err is likely an AxiosError with a response property
          errorMessage = err.response?.data?.message || errorMessage;
        }
        setStatus(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={customClasses.authContainer}>
      <div className={customClasses.authCard}>
        <div>
          <h2 className="mt-6 text-center text-3xl text-red-800">
            Welcome to Admin Panel
          </h2>
        </div>
        <form style={{color:"black"}} className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          {formik.status && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{formik.status}</div>
            </div>
          )}
          <div className="-space-y-px">
            <div>
              <label htmlFor="email" className={customClasses.label}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${customClasses.input} ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="password" className={customClasses.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`${customClasses.input} ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`${customClasses.button.primary} w-full`}
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
