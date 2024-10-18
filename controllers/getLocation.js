import axios from "axios";
import { Country } from "../models/locations.js"; // Adjust the import based on your file structure
import dotenv from "dotenv"
dotenv.config()
const options = {
  method: "GET",
  url: "https://twitter-trends-by-location.p.rapidapi.com/locations",
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Replace with your RapidAPI key
    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
  },
};

export const getLocations = async (req, res) => {
  try {
    const response = await axios.request(options);
    const countries = response.data.locations; // Access the locations array from the response

    // Ensure countries is an array
    if (!Array.isArray(countries)) {
      console.error('Expected countries to be an array but got:', countries);
      return res.status(500).send('Unexpected response structure');
    }

    // Store each country in the database
    for (const country of countries) {
      const newCountry = new Country({
        name: country.name, // Name of the country
        placeID: country.placeID, // Place ID of the country
        locationType: country.locationType, // Type of location
      });

      // Check if the country already exists to avoid duplicates
      const existingCountry = await Country.findOne({
        placeID: country.placeID,
      });
      if (!existingCountry) {
        await newCountry.save();
        console.log(`Country ${country.name} stored successfully`);
      } else {
        console.log(`Country ${country.name} already exists`);
      }
    }

    res.status(200).json({message: 'Countries stored successfully', data: response.data})
    // res.status(200).json({ message: 'Countries stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving locations');
  }
};

