
import {
    useLoaderData,
    useNavigation,
    useNavigate,
    Form,
    redirect,
    useActionData,
    Navigate,
} from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }) {
    console.log(request)
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    console.log("action")
    
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"
    
    try {
        
        const data = await loginUser({ email, password })
        console.log(data)
        console.log(pathname)
        const response = redirect(pathname)
        response.body = true // It's silly, but it works
        localStorage.setItem("loggedin", true)
        return response
    } catch(err) {
        console.log(err)
        return err.message
    }
}

export default function Login() {
    
    const errorMessage = useActionData("")
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h4 className="red">{message}</h4>}
            {(typeof errorMessage) === "string"  && <h5 className="red">{errorMessage}</h5>}

            <Form 
                method="post" 
                className="login-form" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}
