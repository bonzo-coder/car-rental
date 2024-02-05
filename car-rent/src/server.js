import { createServer, Model, Response } from "miragejs"


createServer({
    models: {
        cars: Model,
        users: Model

    },

    seeds(server) {
        server.create("car", { id: "1", hostId: "123", name: "BMW 4", price: 80, brand: "BMW", model: "series 4", year: "2018", imageUrl: "https://assets.scrimba.com/adcarced-react/react-router/modest-explorer.png", type: "sport" })
        server.create("car", { id: "2", hostId: "123", name: "BMW 3", price: 60, brand: "BMW", model: "series 3", year: "2016", imageUrl: "https://assets.scrimba.com/adcarced-react/react-router/modest-explorer.png", type: "sport" })
        server.create("car", { id: "3", hostId: "123", name: "BMW 5", price: 90, brand: "BMW", model: "series 5", year: "2019", imageUrl: "https://assets.scrimba.com/adcarced-react/react-router/modest-explorer.png", type: "limusine" })
        server.create("car", { id: "4", hostId: "123", name: "BMW 7", price: 160, brand: "BMW", model: "series 7", year: "2021", imageUrl: "https://assets.scrimba.com/adcarced-react/react-router/modest-explorer.png", type: "luxury" })
        server.create("car", { id: "5", hostId: "123", name: "BMW 1", price: 40, brand: "BMW", model: "series 1", year: "2016", imageUrl: "https://assets.scrimba.com/adcarced-react/react-router/modest-explorer.png", type: "city" })
        server.create("car", { id: "6", hostId: "123", name: "BMW 4", price: 100, brand: "BMW", model: "series 4", year: "2022", imageUrl: "https://assets.scrimba.com/adcarced-react/react-router/modest-explorer.png", type: "sport" })
        server.create("user", { id: "123", email: "car1@wp.pl", password: "123", name: "Pab" })
        server.create("user", { id: "246", email: "car2@wp.pl", password: "246", name: "Woz" })
    },

    routes() {
        this.namespace = "api"
        this.logging = false
        this.timing = 1000
        this.passthrough("https://firestore.googleapis.com/**")

        this.get("/cars", (schema, request) => {
            return schema.cars.all()
        })

        this.get("/cars/:id", (schema, request) => {
            const id = request.params.id
            return schema.cars.find(id)
        })

        this.get("/host/cars", (schema, request) => {
            // Hard-code the hostId for now
            return schema.cars.where({ hostId: "123" })
        })

        this.get("/host/cars/:id", (schema, request) => {
            const id = request.params.id
            return schema.cars.findBy({ id, hostId: "123" })
        })

        this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            // check to change it from visible to hidden
            const foundUser = schema.users.findBy({ email, password })
            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" })
            }
            
            // At the very least, don't send the password back to the client 😅
            foundUser.password = undefined
            localStorage.setItem("loggedId", foundUser.id)
            return {
                user: foundUser,
                token: "Enjoy your pizza, here's your tokens."
            }
        })
    }
})