import { connection } from "../database/database.connection.js";
import dateFormat from "dateformat";



export async function getRentals(req, res) {
    try {
        const { rows } = await connection.query(`
        SELECT json_build_object(
            'id', rentals.id,
            'customerId', customers.id,
            'gameId', games.id,
            'rentDate', rentals."rentDate",
            'daysRented', rentals."daysRented",
            'returnDate', rentals."returnDate",
            'originalPrice', rentals."originalPrice",
            'delayFee', rentals."delayFee",
            'customer', json_build_object(
                'id', customers.id,
                'name', customers.name
            ),
            'game', json_build_object(
                'id', games.id,
                'name', games.name 
            )
        ) 
        FROM rentals
        JOIN games
        ON rentals."gameId" = games.id
        JOIN customers
        ON rentals."customerId" = customers.id
        `)

        const finalBody = rows.map(elm => {
            return elm.json_build_object
        })

        res.send(finalBody)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function postRegisterRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    //To format date
    const newDate = dateFormat(new Date(), "yyyy-mm-dd")

    try {

        //check if game id and customer id exists
        const gamesInfoById = await connection.query(`SELECT * FROM games WHERE id='${gameId}'`)
        const customersInfoById = await connection.query(`SELECT * FROM customers WHERE id='${customerId}'`)
        if (gamesInfoById.rowCount < 1 || customersInfoById.rowCount < 1) return res.sendStatus(400)

        //check if game stock its not filled, to rental a game
        const rentalsInfo = await connection.query(`SELECT * FROM rentals WHERE "gameId"='${gameId}'`)
        if (rentalsInfo.rowCount >= gamesInfoById.rows[0].stockTotal) return res.sendStatus(400)
        const originalPrice = gamesInfoById.rows[0].pricePerDay * daysRented

        //register at database new rental
        await connection.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ('${customerId}', '${gameId}', '${newDate}', '${daysRented}', null, '${originalPrice}', null)`)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}

export async function postReturnRentals(req, res) {
    const { id } = req.params
    const date = dateFormat(new Date(), 'yyyy-mm-dd')

    try {
        const { rowCount, rows } = await connection.query(`
        SELECT *
        FROM rentals
        WHERE rentals.id = ${id}
        `)

        //Verifications before sendo to database
        if (rowCount < 1) return res.sendStatus(404)
        if (rows[0].returnDate !== null) return res.sendStatus(400)

        //const to calculate diference between rent date and devolution date
        const rentalDate = dateFormat(rows[0].rentDate, 'yyyy-mm-dd')
        const daysRentedNow = (new Date(rentalDate) - new Date(date)) / (1000 * 60 * 60 * 24) * -1
        let feeToPay = 0
        if (daysRentedNow > rows[0].daysRented) {
            let differenceBetweenDates = daysRentedNow - rows[0].daysRented
            let feeForDay = rows[0].originalPrice / rows[0].daysRented
            feeToPay = differenceBetweenDates * feeForDay
        }

        //Update at database
        await connection.query(`
            UPDATE rentals
            SET "returnDate"='${date}', "delayFee"='${feeToPay}'
            WHERE id='${id}'
        `)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function deleteRentals(req, res) {
    const { id } = req.params

    try {
        const { rows, rowCount } = await connection.query(`SELECT * FROM rentals WHERE rentals.id='${id}'`)
        if (rowCount < 1) return res.sendStatus(404)
        if (rows[0].returnDate === null) return res.sendStatus(400)

        await connection.query(`DELETE FROM rentals WHERE id='${id}'`)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.error)
    }
}