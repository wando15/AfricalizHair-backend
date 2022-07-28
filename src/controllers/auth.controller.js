function AuthController({ userRepository, authRepository, bcrypt, shortid, config, mailer, APIError }) {
    async function login(req, res, next) {
        const { email, pass } = req.body;
        const user = await userRepository.getByEmail(email);

        if (!user) {
            throw (new APIError(messages.error_login, 422, true));
        }

        let passwordCheck = bcrypt.compareSync(pass, user.pass);

        if (!passwordCheck) {
            throw (new APIError(messages.error_login, 422, true));
        }

        const session = {
            email: user.email,
            full_name: user.name + " " + user.last_name,
            user_id: user.id,
            expires: new Date(Date.now() + 24 * 3600 * 1000),
            time_in: new Date()
        };

        req.session.user = await authRepository.create(session);

        return session;
    }

    async function logout(req, res, next) {
        const { user } = req.session;
        user.time_out = new Date();

        const auth = await authRepository.getById(user.id);

        if (!auth) {
            throw (new APIError(messages.error_logout, 500, true));
        }

        await authRepository.update(auth, user);

        delete req.session.user; // any of these works
        req.session.destroy();
        return;
    }

    async function forgot(req, res, next) {
        const { email } = req.params;
        let user = await userRepository.getByEmail(email);

        if (!user) {
            throw (new APIError(messages.not_found, 404, true));
        }

        const user_request = {};
        user_request.pass_resset_key = shortid.generate();
        user_request.pass_key_expires = new Date().getTime() + 20 * 60 * 1000

        user = await userRepository.update(user, user_request);

        if (!user) {
            throw (new APIError(messages.error_forgot, 404, true));
        }

        mailer.send({
            to: user.email,
            template_id: 'forgot_password',
            params: {
                name: user.name,
                code: user.pass_resset_key
            }
        }, next);
        return;
    }

    async function reset(req, res, next) {
        const { key } = req.query;
        const { new_pass } = req.body;

        let user = await userRepository.getByRessetKey(key);

        if (!user) {
            throw (new APIError(messages.error_key, 404, true));
        }

        const now = new Date().getTime();
        const key_expiration = user.pass_key_expires;

        if (key_expiration < now) {
            throw (new APIError(messages.error_key_expiration, 500, true));
        }

        const updated_user = {};
        updated_user.pass = bcrypt.hashSync(new_pass, config.bcrypt.NUMBER_CRIPTY);

        updated_user.pass_resset_key = null;
        updated_user.pass_key_expires = null;

        user = await userRepository.update(user, updated_user);

        if (!user) {
            throw (new APIError(messages.error_reset, 500, true));
        }

        return;
    }

    return {
        login,
        logout,
        forgot,
        reset
    }
}

module.exports = AuthController;