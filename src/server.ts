import fastify from "fastify";
import { supabase } from "./supabaseConnections";
import { request } from "http";


const app = fastify();

type Users = {
    name: String
    email: String
}

app.get("/users", async () => {

    try {
        const { data: users } = await supabase.from("users").select("*")

        return { value: users }
    } catch (error) {
        console.error(error)
        throw error
    }
})

app.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body as Users

        const{ data: createdUser } = await supabase.from("users").insert([
            name,
            email
        ])
    } catch (error) {
        console.error(error);
        throw error;
    }
})