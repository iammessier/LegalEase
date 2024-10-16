import axios from 'axios';

export default async function handler(req, res) {
  const { lawType, searchQuery } = req.query;

  try {
    // Example API URL to fetch Indian laws, you may replace it with any available government API
    const apiURL = `https://akshit-me.gitbook.io/e-courts-india-api/`;

    const response = await axios.get(apiURL);

    // Assuming the API returns a list of laws and documents
    const data = response.data;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching legal documents:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch legal documents.' });
  }
}



