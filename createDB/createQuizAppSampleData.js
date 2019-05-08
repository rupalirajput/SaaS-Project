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
db.createCollection('reports')
reportCollection = db.getCollection("reports")
reportCollection.remove({})
reportCollection.insert(
{
      reportid: 1,
      userid: 1,
      quesBankID: 101,
      score: 87,
      strengths: "Slopes of lines",
      weaknesses: "Horizontal and Vertical Lines"
    }
)
reportCollection.insert(
{
    reportid:2,
    userid: 1,
    quesBankID: 102,
    score: 65,
    strengths: "Newton's Laws of Motion",
    weaknesses: "Fluid Dynamics"
    
    }
)
