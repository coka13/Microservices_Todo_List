import AxiosFetch from "../axiosFetch.js";

const axiosInstance = new AxiosFetch();

export const checkUser = async (req, res, next) => {
    try {
        const user=req.query.user ?? req.query.userId;
        if (user) {
            const response = await axiosInstance.get(
                `${process.env.SERVICE1_URL}/api/auth/${user}`);
            
            if (response.status === 200 && !response.data.error) {
                req.user=response.data.user;
                next();
            } else {
                throw new Error("User not found");
            }

        } else {
            throw new Error("userId not provided");
        }
    } catch (err) {
        console.log("Error: " + err.message)
        return res.status(401).json({ error: true, message: err.message });
    }

}