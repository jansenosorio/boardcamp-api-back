import { connection } from "../database/database.connection.js";
import dateFormat from "dateformat";

export async function postRegisterRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    //To format date
    const newDate = dateFormat(new Date(), "yyyy-mm-dd")

    console.log(newDate)
    try {
        const gamesInfoById = await connection.query(`SELECT * FROM games WHERE id='${gameId}'`)
        const customersInfoById = await connection.query(`SELECT * FROM customers WHERE id='${customerId}'`)
        if (gamesInfoById.rowCount < 1 || customersInfoById.rowCount < 1) return res.sendStatus(400)
        const rentalsInfo = await connection.query(`SELECT * FROM rentals WHERE "gameId"='${gameId}'`)
        if (rentalsInfo.rowCount >= gamesInfoById.rows[0].stockTotal) return res.sendStatus(400)
        const originalPrice = gamesInfoById.rows[0].pricePerDay * daysRented
        await connection.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ('${customerId}', '${gameId}', '${newDate}', '${daysRented}', null, '${originalPrice}', null)`)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}