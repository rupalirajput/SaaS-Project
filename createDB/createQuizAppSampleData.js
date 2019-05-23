db = db.getSiblingDB('QuizAppSample')

// BEGIN: Accounts
db.createCollection('accounts')
accountsCollection = db.getCollection("accounts")
accountsCollection.remove({})
accountsCollection.insert(
	{
	  username : "ABC",
    password : "1234",
    userid : 1,
	  firstName : "ABC",
    lastName : "XYZ",
    email : "abc@gmail.com",
    role : "student"
	}
)

accountsCollection.insert(
	{
    username : "PQR",
    password : "1234",
    userid : 2,
    firstName : "PQR",
    lastName : "OPQ",
    email : "pqr@gmail.com",
    role : "professor"
	}
)
// END: Accounts

//BEGIN: Reports
db.createCollection('reports')
reportCollection = db.getCollection("reports")
reportCollection.remove({})
reportCollection.insert(
	{
    reportid : 1,
    userid : 1,
    quesBankID : 101,
    score : 87,
    strengths : "Slopes of lines",
    weaknesses : "Horizontal and Vertical Lines"
  }
)

reportCollection.insert(
	{
    reportid :2,
    userid: 1,
    quesBankID : 102,
    score : 65,
    strengths : "Newton's Laws of Motion",
    weaknesses : "Fluid Dynamics"
  }
)
// END: Reports

// BEGIN: Question Banks
db.createCollection('questionBanks')
questionBanksCollection = db.getCollection("questionBanks")
questionBanksCollection.remove({})
questionBanksCollection.insert(
  {
    quesBankID : 101,
    quesBankName : "Mathematics",
    status : "Published",
    createdDate : "05/07/2019",
    lastmodifiedDate : "05/08/2019",
    createdBy : "Prof. A",
    updatedBy : "Prof. H"
  }
)

questionBanksCollection.insert(
  {
    quesBankID : 102,
    quesBankName : "Physics",
    status : "Not Published",
    createdDate : "04/07/2019",
    lastmodifiedDate : "04/08/2019",
    createdBy : "Prof. H",
    updatedBy : "Prof. H"
  }
)
// END: Question Banks

// BEGIN: Questions
db.createCollection('questions')
questionsCollection = db.getCollection("questions")
questionsCollection.remove({})
questionsCollection.insert(
  {
    questionBankID : 101,
    questionID : 1011,
    questionText : "What is the square of 12?",
    category : "Mathematics",
	  options :
			[
				"140",
				"143",
				"12",
				"144"
			],
    answer : "144"
	}
)

questionsCollection.insert(
  {
		questionBankID : 101,
    questionID : 1012,
    questionText : "What is the squareroot of 169?",
    category : "Mathematics",
    options :
			[
				"12",
				"13",
				"11",
				"14"
			],
    answer : "13"
	}
)
questionsCollection.insert(
  {
    questionBankID : 102,
    questionID : 1021,
    questionText : "Which of below has both magnitude and direction?",
    category : "Physics",
    options :
			[
				"scaler",
				"vector",
				"displacement",
				"speed"
			],
    answer: "vector"
	}
)

questionsCollection.insert(
  {
		questionBankID : 102,
    questionID : 1022,
    questionText : "What is the formula to calculate speed?",
    category : "Physics",
  	options :
			[
				"speed = distance/time",
				"speed = distance * time",
				"speed = time/distance",
				"None of the above"
			],
    answer : "speed = distance/time"
  }
)
// END: Questions


// BEGIN: Test
db.createCollection('test')
testCollection = db.getCollection("test")
testCollection.remove({})
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 1011,
	 	orderOfQuestionInTest : 1,
		category : "Physics",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 1015,
	 	orderOfQuestionInTest : 2,
		category : "Physics",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10120,
	 	orderOfQuestionInTest : 3,
		category : "Physics",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 1017,
	 	orderOfQuestionInTest : 4,
		category : "Physics",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10115,
	 	orderOfQuestionInTest : 5,
		category : "Physics",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10110,
	 	orderOfQuestionInTest : 6,
		category : "Physics",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10150,
	 	orderOfQuestionInTest : 7,
		category : "Physics",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 1013,
	 	orderOfQuestionInTest : 2,
		category : "Physics",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10133,
	 	orderOfQuestionInTest : 2,
		category : "Physics",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 2,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 1021,
	 	orderOfQuestionInTest : 1,
		category : "Biology",
		isCorrect : 1
	}
)
// END: Test
