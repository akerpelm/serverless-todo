const AWS = require("aws-sdk");

const fetchTodos = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(); //need permission to access db (iamRoleStatements)

  let todos;

  try {
    const results = await dynamodb.scan({ TableName: "TodoTable" }).promise(); //one or more indices
    todos = results.Items;
  } catch (err) {
    console.log(err); //would actually return error here
  }
  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos,
};
