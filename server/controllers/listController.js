// Using Model
const Data = require('../models/dataModel')

async function getAllList(req, res) {
    try {
        const list = await Data.getAllList();
        if (list === null) {
            throw { statusCode: 500, message: 'Something Wrong' }
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode
        })
    }
}

async function filterList(req, res) {
    // Checking body
    try {
        let reqBody = req.body
        if (JSON.stringify(reqBody) === JSON.stringify({})) {
            throw { statusCode: 400, message: 'Bad Request' }
        }
        else {
            // Checking filter
            try {
                let filter = reqBody.filter
                if (JSON.stringify(filter) === JSON.stringify({})) {
                    throw { statusCode: 400, message: 'Bad Request' }
                }
                else {
                    // Checking text
                    try {
                        let title = filter.title
                        if (JSON.stringify(title) === JSON.stringify({})) {
                            throw { statusCode: 400, message: 'Bad Request' }
                        }
                        else {
                            // Validate title
                            if (typeof title === 'string' && title.trim() !== '') {
                                // have value in title
                                try {
                                    const list = await Data.getAllList();
                                    if (list === null) {
                                        throw { statusCode: 500, message: 'Something Wrong' }
                                    }
                                    // find list by title
                                    const result = list.find((data) => {
                                        return data.title.includes(title)
                                    })

                                    res.status(200).json([result]);
                                } catch (error) {
                                    res.status(error.statusCode).json({
                                        message: error.message,
                                        status: error.statusCode
                                    })
                                }
                            }
                            else {
                                res.status(400).json({
                                    message: 'Bad Request',
                                    status: 400
                                })
                            }
                        }
                    }
                    catch (error) {
                        res.status(error.statusCode).json({
                            message: error.message,
                            status: error.statusCode
                        })
                    }
                }
            }
            catch (error) {
                res.status(error.statusCode).json({
                    message: error.message,
                    status: error.statusCode
                })
            }
        }
    }
    catch (error) {
        res.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode
        })
    }
}

module.exports = {
    getAllList,
    filterList
}