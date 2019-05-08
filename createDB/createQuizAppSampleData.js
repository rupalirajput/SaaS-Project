db = db.getSiblingDB('QuizAppSample')
db.createCollection('accounts')
accountsCollection = db.getCollection("accounts")
accountsCollection.remove({})
accountsCollection.insert(
{
	  username: "ABC",
	  password: "1234",
	  firstName: "ABC",
	  lastName: "XYZ"
}
)
accountsCollection.insert(
{
      username: "PQR",
      password: "1234",
      firstName: "PQR",
      lastName: "OPQ"
}
)