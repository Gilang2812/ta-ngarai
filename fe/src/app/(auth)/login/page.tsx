'use client'
import { Form, Formik } from "formik"; 
import { FaRegUser, FaShieldVirus } from "react-icons/fa"; 
import Heading from "@/components/auth/Heading"; 
import { FormSubmit } from "@/components/inputs/FormSubmit";
import { FormInput } from "@/components/inputs/FormInput";
import { loginSchema } from "@/validation/authSchema";
import { showErrorAlert } from "@/utils/AlertUtils";
import { useLogin } from "@/features/auth/useLogin";

// Define the validation schema using Yup
 
export default function Login() {

  const { mutate, isPending } = useLogin({
    onSuccess: () => {
      console.log("Login successful:");
    },
    onError: (e) => {
      showErrorAlert(e)
      console.error("Error during login:", e);
    },
  });

  return (
    <section className="p-8 bg-white rounded-xl" aria-labelledby="login-heading">
      <Heading id="login-heading">Login</Heading>
 
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          mutate(values);
         
        }}
      >
    
        <Form>
          <fieldset className="mb-8 space-y-4">
            <legend className="sr-only">Login Form</legend>

          
        
                <FormInput
                    name="email"
                  icon={FaRegUser}
                  type="text"
                  placeholder="Email or Username"
                 />
           

            
          
                <FormInput
                 
                  icon={FaShieldVirus}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
            
          
          </fieldset>

        
          <FormSubmit isLoading={isPending} value="Login" />

         
          <a
            href="/register"
            className="block text-center font-bold transition-ease-in-out text-primary hover:text-secondary"
          >
        Need an account?
          </a>
        </Form>
      </Formik>
    </section>
  );
}
