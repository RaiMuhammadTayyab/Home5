var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const messageBody = JSON.parse(event.body);
   // var adminClient = new faunadb.Client({ secret: 'fnAD_BgJrpACAU5-JWrqi_AGQPSOhXnEF9I-IPKb' });
var adminClient= new faunadb.Client({secret:'fnAEOg9mtQACDHEiqvR-f5RTuIlYSA1eouYN4qpf'})
    const result = await adminClient.query(
      q.Create(
        q.Collection('messages'),
        { data: { detail:  messageBody.message} },
      )
    )

    // const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message:  result.ref.id}),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
