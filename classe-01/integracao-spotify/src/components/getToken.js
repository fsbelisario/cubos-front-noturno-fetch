async function getToken() {
    const userId = "9d18c669d92746d8a91f3528757a1e0d";
    const secretKey = "0e1928e9f9164c24b0521d2cf0516e6f";

    const getTokenURL = (userId, secretKey) =>
        `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${userId}&client_secret=${secretKey}`;

    try {
        const response = await fetch(getTokenURL(userId, secretKey), {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" } //Conforme seção 2 de https://developer.spotify.com/documentation/general/guides/authorization-guide/
        });

        const { access_token, token_type } = await response.json();

        return `${token_type} ${access_token}`;
    } catch (error) {
        throw error;
    }
}

export default getToken;