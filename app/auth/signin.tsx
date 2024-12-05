"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../reduxs/store";
import { login } from "../reduxs/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleSignIn = async (values: typeof initialValues) => {
    try {
      await dispatch(login(values)).unwrap(); // Await the async thunk to handle errors here
      route.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-2"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Loading...." : " Login"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
