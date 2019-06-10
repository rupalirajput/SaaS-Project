db = db.getSiblingDB('QuizAppSample')

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
		category : "Trigonometry",
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
		category : "Trigonometry",
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
		category : "Trigonometry",
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
		category : "Conic Sections",
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
		category : "Conic Sections",
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
		category : "Conic Sections",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10110,
	 	orderOfQuestionInTest : 7,
		category : "Vectors",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10110,
	 	orderOfQuestionInTest : 8,
		category : "Vectors",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10110,
	 	orderOfQuestionInTest : 9,
		category : "Vectors",
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
	 	orderOfQuestionInTest : 10,
		category : "Matrices",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10110,
	 	orderOfQuestionInTest : 11,
		category : "Matrices",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 10110,
	 	orderOfQuestionInTest : 12,
		category : "Matrices",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 1,
		category : "Motion",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 2,
		category : "Motion",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 3,
		category : "Motion",
		isCorrect : 1
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 4,
		category : "One Dimensional Kinematics",
		isCorrect : 1
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 5,
		category : "One Dimensional Kinematics",
		isCorrect : 1
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 6,
		category : "One Dimensional Kinematics",
		isCorrect : 1
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 7,
		category : "Vectors",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 8,
		category : "Vectors",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 9,
		category : "Vectors",
		isCorrect : 1
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 10,
		category : "Newton's Laws",
		isCorrect : 0
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 11,
		category : "Newton's Laws",
		isCorrect : 1
	}
)
testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 10110,
	 	orderOfQuestionInTest : 12,
		category : "Newton's Laws",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 1,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 103,
		questionID : 10110,
	 	orderOfQuestionInTest : 12,
		category : "Newton's Laws",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 2,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 103,
		questionID : 10110,
	 	orderOfQuestionInTest : 12,
		category : "Newton's Laws",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 2,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 103,
		questionID : 10110,
	 	orderOfQuestionInTest : 12,
		category : "Newton's Laws",
		isCorrect : 0
	}
)



