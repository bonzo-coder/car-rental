import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin")
    console.log(isLoggedIn)
    if (!isLoggedIn) {
        const response = redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
        response.body = true  // It's silly, but it works
        console.log(response)
        throw response
    }
    
    return null;
}
