import axios from "axios";

export const getTrendsByLocation = async (req, res) => {
  const placeId = req.params.id;

  try {
    const options = {
      method: "GET",
      url: `https://twitter-trends-by-location.p.rapidapi.com/location/${placeId}`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
      },
    };

    const response = await axios.request(options);

    // Log API response for debugging
    console.log("API Response: ", response.data);

    // Send the API response directly to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in getTrendsByLocation:", error.message);
    res.status(500).json({ message: "An error occurred while fetching trends." });
  }
};
