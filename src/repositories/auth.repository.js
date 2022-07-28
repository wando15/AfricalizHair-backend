function AuthRepository(Auth) {
    async function create(auth_request) {
        try {
            const new_auth = await Auth.create(auth_request);

            return new_auth || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(auth, auth_request) {
        try {
            await auth.update(auth_request);
            return auth || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    return {
        create,
        update
    }
}

module.exports = AuthRepository;


