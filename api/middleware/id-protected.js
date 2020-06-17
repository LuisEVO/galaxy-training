
module.exports = (req, res, next) => {
    try {
        const _id = req.params.id;
        const ids = [
            '5ec47a2efe8c1b52bc8514d8',
            '5ec47a65fe8c1b52bc8514d9',
            '5ec47aa4fe8c1b52bc8514da',
            '5ec47af7fe8c1b52bc8514db',
            '5ec47b2cfe8c1b52bc8514dc'
        ];

        if (ids.includes(_id)) {
            res.status(403).json({ message: "Este id esta protegido" });
        } else {
            next();
        }
    } catch (error) {
        return res.status(403).json({ message: 'Debe enviar el parametro id' });
    }
};
