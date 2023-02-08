import { connection } from "../database/database.connection.js";
import moment from 'moment'

export async function getCustomers(req, res) {

    try {
        const { rows } = await connection.query('SELECT * FROM customers')
        res.send(rows)
    } catch (error) {
        res.status(500).send(error)
    }

}

export async function postRegisterCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    const isDataValid = moment(birthday, 'YYYY-MM-DD', true).isValid()


    try {
        const { rowCount } = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}'`)
        if (!isDataValid) return res.sendStatus(400)
        if (rowCount >= 1) return res.sendStatus(409)
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error)
    }
}