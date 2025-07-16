const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { titre, montant, categorie, date } = data;

    const item = {
      id: Date.now().toString(),
      titre,
      montant: Number(montant),
      categorie,
      date,
    };

    await dynamodb.put({
      TableName: 'DepensesTable',
      Item: item,
    }).promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // <- important pour CORS
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS"
      },
      body: JSON.stringify({
        message: "Dépense ajoutée avec succès",
        depense: item,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // <- aussi ici
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS"
      },
      body: JSON.stringify({
        message: "Erreur dans les données envoyées",
        error: error.message,
      }),
    };
  }
};
