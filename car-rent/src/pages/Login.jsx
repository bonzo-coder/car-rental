
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
} from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"
    
    try {
        
        const data = await loginUser({ email, password })
        const response = redirect(pathname)
        response.body = true // It's silly, but it works
        localStorage.setItem("loggedin", true)
        return response
    } catch(err) {
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
                <div className="allDetails">
                <p className="passwordDetails"> Login details <span><br/> login1: car1@wp.pl  Pass: 123</span></p>
                <p className="passwordDetails"> Login details <span><br/> login2: car2@wp.pl  Pass: 246</span></p>
                </div>
            </Form>
        </div>
    )
}
