const send = {
    success: (res, message, data) => {
        res.status(201).json({
            status: true,
            message,
            data
        });
    },
    fail: (res, message) => {
        res.status(422).json({
            status: false,
            message
        })
    },
    error: (res, massage, err) => {
        res.status(500).send({
            status: false,
            massage,
            data: err
        })
    },
};

module.exports = send;