import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors());

app.route('/api/v1/user', )

export default app
