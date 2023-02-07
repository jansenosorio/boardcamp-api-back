
export async function getGamesList(req, res) {

    //test variable to test our program
    const testeBody = {
        id: 1,
        name: 'Banco Imobiliário',
        image: 'http://',
        stockTotal: 3,
        pricePerDay: 1500,
    }


    try {
        res.status(200).send(testeBody)
    } catch (error) {
        res.status(500).send(error)
    }

}

export async function postGamesList(req, res) {
    //Use this information to send to Database
    const { name, image, stockTotal, pricePerDay } = req.body

    //Configure this variable to verify Database 
    const isNameExistsAtDb = 'BancoImobiliário' === name

    try {
        if (isNameExistsAtDb) return res.sendStatus(409)
        res.sendStatus(201)
    } catch (error) {
        res.send(error)
    }

}