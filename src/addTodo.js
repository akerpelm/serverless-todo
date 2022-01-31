const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(); //need permission to access db (iamRoleStatements)

  const { todo } = event.body; //parsed with @middy/httpJsonBodyParser
  // const { todo } = JSON.parse(event.body); //find way to parse going forward
  const createdAt = new Date().toISOString();
  const id = v4();
  console.log("This is an id", id); //see this in CloudWatch!

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  await dynamodb
    .put({
      TableName: "TodoTable",
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser()), //can use custom middleware here as well
};
