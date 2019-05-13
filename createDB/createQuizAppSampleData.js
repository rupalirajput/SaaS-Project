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
db.createCollection('questionBanks')
questionBanksCollection = db.getCollection("questionBanks")
questionBanksCollection.remove({})
questionBanksCollection.insert(
      {
            quesBankID: 101,
            quesBankName: "Mathematics",
            status: "Published",
            createdDate: "05/07/2019",
            lastmodifiedDate: "05/08/2019",
            createdBy: "Prof. A",
            updatedBy: "Prof. H"

      }
)
questionBanksCollection.insert(
      {
            quesBankID: 102,
            quesBankName: "Physics",
            status: "Not Published",
            createdDate: "04/07/2019",
            lastmodifiedDate: "04/08/2019",
            createdBy: "Prof. H",
            updatedBy: "Prof. H"

      }
)
db.createCollection('questions')
questionsCollection = db.getCollection("questions")
questionsCollection.remove({})
questionsCollection.insert(
      {
            quesBankID: 101,
            questions: [
                  {
                        quesid : 1011,
                        questiontext : "What is the square of 12?",
                        description : "Mathematics",
                        options:[{opt1:"140",opt2:"143",opt3:"12",opt4:"144"}],
                        answer: "144"

                  },
                  {
                        quesid : 1012,
                        questiontext : "What is the squareroot of 169?",
                        description : "Mathematics",
                        options:[{opt1:"12",opt2:"13",opt3:"11",opt4:"14"}],
                        answer: "13"

                  }
            ]

      }
)
questionsCollection.insert(
      {
            quesBankID: 102,
            questions: [
                  {
                        quesid : 1021,
                        questiontext : "Which of below has both magnitude and direction?",
                        description : "Physics",
                        options:[{opt1:"scaler",opt2:"vector"}],
                        answer: "vector"

                  },
                  {
                        quesid : 1022,
                        questiontext : "What is the formula to calculate speed?",
                        description : "Physics",
                        options:[{opt1:"speed = distance/time",opt2:"speed = distance * time",opt3:"speed = time/distance",opt4:"None of the above"}],
                        answer: "speed = distance/time"

                  }
            ]

      }
)
