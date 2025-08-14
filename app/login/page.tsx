"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/ValidationSchema";
import { useTheme as useMuiTheme } from "@mui/material";
import { loginService } from "../../service/auth";

export default function LoginPage() {
  const router = useRouter();
  const theme = useMuiTheme();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await loginService(values,router);
      } catch (err: unknown) {
        let errorMessage = "An error occurred during login";
        if (typeof err === "object" && err !== null && "response" in err) {
          // @ts-expect-error: err is likely an AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }
        setStatus(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div
        className="hidden lg:flex flex-col justify-center items-start w-1/2 px-16"
        style={{
          backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.main : "#121212",
          color:theme.palette.mode === 'light'? theme.palette.primary.contrastText : theme.palette.text.primary,
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p className="text-lg opacity-90">
          Manage users, monitor activities, and configure your application settings
          from one central place.
        </p>
      </div>

      {/* Right Side */}
      <div style={{
          backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : theme.palette.background.paper,
          opacity: theme.palette.mode === "light" ? "100%" : "110%",
          color:theme.palette.mode === 'light'? theme.palette.text.secondary : theme.palette.text.secondary,
        }} className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Sign in to your account
          </h2>
          <form  className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            {formik.status && (
              <div className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
                {formik.status}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.password}</div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
