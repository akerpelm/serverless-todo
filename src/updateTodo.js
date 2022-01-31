const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(); //need permission to access db (iamRoleStatements)

  const { completed } = event.body;
  const { id } = event.pathParameters;

  await dynamodb
    .update({
      TableName: "TodoTable",
      Key: { id },
      UpdateExpression: "set completed = :completed", //inject completed value into completed column
      ExpressionAttributeValues: {
        ":completed": completed, //completed equals the completed value from event body
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: `Todo with id:${id} updated` }), //how would I show the actual todo here?
  };
};

module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser()),
};
