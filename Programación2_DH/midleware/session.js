const sessionToTemplate = (req, res, next) => {
    if (req.session.auth) {
        res.locals.auth = req.session.auth
        console.log(res.locals.auth)
    }
    next()
}


module.exports = sessionToTemplate;