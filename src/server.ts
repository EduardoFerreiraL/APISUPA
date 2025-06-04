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

        const { data: createdUser } = await supabase.from("users").insert([{
            name,
            email
        }]).select()

        return{
            value: createdUser ? createdUser [0] : null //verificação pra ver se tem o createUser ele ira devolver na posição 0 e se nn ele vai devolver nulo
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
})

app.listen({
    host: '0.0.0.0',
    port:  process.env.PORT ? Number(process.env.PORT) : 3002 //Se houver process.env.PORT ira devolver ele msm (?), se nn era devolver a porta 3002(:)
}).then(() =>{
    console.log('Servidor funcionando!')
})