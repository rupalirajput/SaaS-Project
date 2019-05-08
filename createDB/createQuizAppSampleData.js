db = db.getSiblingDB('QuizAppSample')
db.createCollection('accounts')
accountsCollection = db.getCollection("accounts")
accountsCollection.remove({})
accountsCollection.insert(
{
	  username: "ABC",
      password: "1234",
      userid: 1,
	  firstName: "ABC",
      lastName: "XYZ",
      email: "abc@gmail.com",
      role: "student"

}
)
accountsCollection.insert(
{
      username: "PQR",
      password: "1234",
      userid: 2,
      firstName: "PQR",
      lastName: "OPQ",
      email: "pqr@gmail.com",
      role: "professor"
}
)