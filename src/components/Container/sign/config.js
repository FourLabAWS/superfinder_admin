/*import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIA3ILGYDW4ND3L4NPI',
  secretAccessKey: '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',
  region: 'ap-northeast-2'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const id = document.getElementById('id').value;
const password = document.getElementById('password').value;
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;

const newItem = {
  id: id,
  password: password,
  name: name,
  email: email
};

// DynamoDB에 새로운 아이템 추가
dynamodb.put({
  TableName: 'TB_ADMNR',
  Item: newItem
}, (err, data) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Success:', data);
  }
});*/
const AWS = require('aws-sdk');
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.936.0.min.js"></script>

// AWS.config 객체를 업데이트합니다.
AWS.config.update({
  accessKeyId: 'AKIA3ILGYDW4ND3L4NPI',
  secretAccessKey: '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',
  region: 'ap-northeast-2'
});

// DynamoDB DocumentClient 객체를 생성합니다.
const dynamodb = new AWS.DynamoDB.DocumentClient();

const insertAdminAccount = (newItem) => {
  dynamodb.put({
    TableName: 'TB_ADMNR',
    Item: newItem
  }, (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Success:', data);
    }
  });
};