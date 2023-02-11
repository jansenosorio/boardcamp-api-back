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

export async function getCustomersById(req, res) {
    const { id } = req.params

    try {
        const { rows, rowCount } = await connection.query(`SELECT * FROM customers WHERE id='${id}'`)
        if (rowCount === 0) return res.sendStatus(404)
        res.send(rows[0])
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

export async function updateCustomersRegisters(req, res) {
    const { id } = req.params
    const { name, phone, cpf, birthday } = req.body
    const newId = Number(id)
    const isDataValid = moment(birthday, 'YYYY-MM-DD', true).isValid()
    try {
        const { rowCount, rows } = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}'`)
        if (!isDataValid) return res.sendStatus(400)
        if (rowCount >= 1 && rows[0].id !== newId) return res.sendStatus(409)
        await connection.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id='${id}' `)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error)
    }
}