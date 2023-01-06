const profilMiddleware = (req, res, next) => {

    if (req.session.profil) {
        // on a la propriété user dans la session, c'est donc qu'un user est connecté
        res.locals.profil = req.session.profil
        res.locals.profil.connected = true ;

    } else {
        // on n'a pas d'user connecté
        res.locals.profil = false;
    }
    
    // dans un MW on n'oublie pas d'apeller next !
    next();
}

module.exports = profilMiddleware;