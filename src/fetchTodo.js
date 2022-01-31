const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(); //need permission to access db (iamRoleStatements)

  const { id } = event.pathParameters;

  let todo;

  try {
    const result = await dynamodb
      .get({ TableName: "TodoTable", Key: { id } })
      .promise(); //get for single
    todo = result.Item;
  } catch (err) {
    console.log(err); //would actually return error here
  }
  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo,
};
