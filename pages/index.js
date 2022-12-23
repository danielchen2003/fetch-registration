import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import downloadImg from "../public/download.png"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { fetchData, postData } from "../api/constant"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ data }) {
  const { occupations, states } = data
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      state: "Alabama",
      occupation: "Head of Shrubbery",
      terms: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, "Name must be 25 characters or less.")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or longer.")
        .max(20, "Password must be 20 characters or less.")
        .required("Password is required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      terms: Yup.array().required("Terms of service must be checked"),
    }),

    onSubmit: async (values) => {
      // const { passwordConfirmation, terms, ...rest } = values

      const formResult = (({ passwordConfirmation, terms, ...rest }) => rest)(
        values
      )

      const response = await postData(formResult)

      console.log("form submitted")
      console.log(formResult)
      console.log(response.status)
      if (response.status === 201) {
        router.push({ pathname: "/success", query: values })
      } else {
        alert("Something went wrong, unable to submit form")
      }
    },
  })

  return (
    <>
      <Head>
        <title>Fetch Rewords</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-screen">
        <form
          className="flex w-3/5 bg-white rounded-lg font-latoRegular"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex-1 p-20 text-gray-700">
            <h1 className="pb-2 text-4xl font-latoBold">Fetch</h1>
            <p className="text-lg text-gray-500">
              Saving Has Never Been SO FUN
            </p>
            <p className="text-sm text-gray-500">
              Snap receipts, earn rewards and connect with friends in the Fetch
              app!
            </p>
            <div className="mt-6 ">
              {/* name input field 8*/}
              <div className="pb-4">
                <label
                  htmlFor="name"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.name && formik.errors.name
                      ? "text-red-500"
                      : ""
                  } `}
                >
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : "Full Name"}
                </label>
                <input
                  className="w-3/5 p-2 border-2 border-gray-400 rounded-md focus:border-teal-500 focus:ring-teal-500"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  placeholder="Please enter your full name"
                />
              </div>
              {/* Email input field 8*/}
              <div className="pb-4">
                <label
                  htmlFor="email"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-400"
                      : ""
                  }`}
                >
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "Email"}
                </label>
                <input
                  className="w-3/5 p-2 border-2 border-gray-400 rounded-md focus:border-teal-500 focus:ring-teal-500"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  placeholder="Please enter your Email"
                />
              </div>

              {/* Password input field 8*/}
              <div className="pb-4">
                <label
                  htmlFor="password"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.password && formik.errors.password
                      ? "text-red-500"
                      : ""
                  } `}
                >
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : "Password"}
                </label>
                <input
                  className="w-3/5 p-2 border-2 border-gray-400 rounded-md focus:border-teal-500 focus:ring-teal-500"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  autoComplete="on"
                  onBlur={formik.handleBlur}
                  placeholder="Please enter your password"
                />
              </div>
              <div className="pb-4">
                <label
                  htmlFor="password"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                      ? "text-red-500"
                      : ""
                  } `}
                >
                  {formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                    ? formik.errors.passwordConfirmation
                    : "Password"}
                </label>
                <input
                  className="w-3/5 p-2 border-2 border-gray-400 rounded-md focus:border-teal-500 focus:ring-teal-500"
                  type="password"
                  name="passwordConfirmation"
                  autoComplete="on"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                  onBlur={formik.handleBlur}
                  placeholder="Please enter your password again"
                />
              </div>

              {/* Occupation input field 8*/}
              <div className="pb-4">
                <label
                  className="block pb-2 text-sm font-latoBold"
                  htmlFor="Occupation"
                >
                  Occupation
                </label>
                <select
                  className="w-3/5 p-2 border-2 border-gray-400 rounded-md focus:border-teal-500 focus:ring-teal-500"
                  name="occupation"
                  onChange={formik.handleChange}
                  value={formik.values.occupation}
                >
                  {occupations.map((occupation, i) => (
                    <option key={i}>{occupation}</option>
                  ))}
                </select>
              </div>
              {/* State input field 8*/}
              <div className="pb-4">
                <label
                  className="block pb-2 text-sm font-latoBold"
                  htmlFor="state"
                >
                  State
                </label>
                <select
                  className="w-3/5 p-2 border-2 border-gray-400 rounded-md focus:border-teal-500 focus:ring-teal-500"
                  name="state"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                >
                  {states.map((state, i) => (
                    <option key={i}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="terms"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.terms && formik.errors.terms
                      ? "text-red-400"
                      : ""
                  }`}
                >
                  {formik.touched.terms && formik.errors.terms
                    ? formik.errors.terms
                    : "Terms of service"}
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-5 h-5 text-teal-500 border-2 background-gray-500 focus:border-teal-500 focus:ring-teal-500"
                  />
                  <p className="text-sm text-gray-500 font-latoBold">
                    I agree to the Terms and Service.
                  </p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-1/6 py-3 mt-5 text-sm text-white bg-teal-500 font-latoBold round"
            >
              Sign up
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              src={downloadImg}
              className="object-cover rounded-lg "
              fill
              priority
              alt="Fetch reward download QR code"
            />
          </div>
        </form>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await fetchData()

  return {
    props: {
      data,
    },
  }
}
