import AxiosFetch from "../axiosFetch.js";

const axiosInstance = new AxiosFetch(); // Initialize Axios instance for fetching

export const checkUser = async (req, res, next) => {
    try {
        const user = req.query.user ?? req.query.userId; // Extract user or userId from request query
        if (user) {
            // Fetch user data from SERVICE1_URL
            const response = await axiosInstance.get(
                `${process.env.SERVICE1_URL}/api/auth/${user}`
            );
            
            // Check if user data was successfully retrieved
            if (response.status === 200 && !response.data.error) {
                req.user = response.data.user; // Attach user data to request object
                next(); // Move to the next middleware
            } else {
                throw new Error("User not found");
            }

        } else {
            throw new Error("userId not provided");
        }
    } catch (err) {
        console.log("Error: " + err.message); // Log any errors that occur
        return res.status(401).json({ error: true, message: err.message }); // Return error response
    }
};
