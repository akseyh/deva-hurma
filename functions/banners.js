import client from "../plugins/contentful"

export async function handler(event, context, callback) {
  // CORS
  if (event.httpMethod === "OPTIONS") {
    return callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
  }

  if (event.httpMethod !== "GET") {
    return callback(null, {
      statusCode: 400,
      errorMessage: "Method not found."
    })
  }

  try {
    const response = await client.getEntries({
      content_type: 'banners'
    })

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      body: error.body
    })
  }
}
