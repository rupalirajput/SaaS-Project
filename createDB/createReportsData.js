db = db.getSiblingDB('QuizAppSample')
db.createCollection('reports')
accountsCollection = db.getCollection("reports")
accountsCollection.remove({})
accountsCollection.insert(
    {
      userid: 1,
	  quesBankID: 101,
      score: 87,
      strengths: "Slopes of lines",
      weaknesses: "Horizontal and Vertical Lines"
    }
)
accountsCollection.insert(
    {
    userid: 1,
    quesBankID: 102,
    score: 65,
    strengths: "Newton's Laws of Motion",
    weaknesses: "Fluid Dynamics"
    
    }
)