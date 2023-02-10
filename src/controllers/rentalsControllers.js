import { connection } from "../database/database.connection.js";
import dateFormat from "dateformat";

export async function postRegisterRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    //Bibli to format dates
    const newDate = dateFormat(new Date(), "yyyy-mm-dd")

    console.log(newDate)
    try {
        const gamesInfo = await connection.query(`SELECT * FROM games WHERE id='${gameId}'`)
        const customersInfo = await connection.query(`SELECT * FROM customers WHERE id='${customerId}'`)
        const originalPrice = gamesInfo.rows[0].pricePerDay * daysRented
        if (gamesInfo.rowCount < 1 || customersInfo.rowCount < 1) return res.sendStatus(400)
        await connection.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ('${customerId}', '${gameId}', '${newDate}', '${daysRented}', null, '${originalPrice}', null)`)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}