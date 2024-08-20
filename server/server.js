require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path'); // Add this line to import the path module
const app = express();
const { Storage } = require('@google-cloud/storage');


app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

// Initialize the Google Cloud Storage client with credentials
const storage = new Storage({
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});
const folderPath = process.env.FOLDER_PATH;
const bucketName = process.env.BUCKET_NAME;
const defaultPageSize = parseInt(process.env.PAGE_SIZE, 10) || 40;


async function listFilesInBucket(pageToken = null, pageSize = defaultPageSize) {
    const options = {
        prefix: folderPath,
        maxResults: pageSize,
    };

    if (pageToken) {
        options.pageToken = pageToken;
    }

    const [files, nextQuery] = await storage.bucket(bucketName).getFiles(options);

    const fileUrls = files.map(file => {
        return `https://storage.googleapis.com/${bucketName}/${file.name}`;
    });

    return {
        fileUrls,
        nextPageToken: nextQuery?.pageToken || null,  // Return the next page token if available
    };
}

app.get('/images', async (req, res) => {
    try {
        const { pageToken, pageSize } = req.query;
        const size = parseInt(pageSize, 10) || defaultPageSize;
        const result = await listFilesInBucket(pageToken, size);
        res.json(result);
    } catch (error) {
        console.error('Error retrieving images', error);
        res.status(500).json({ error: 'Error retrieving images' });
    }
});

// Handles any requests that don't match the above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

