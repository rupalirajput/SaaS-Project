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
    questionBankID : 101,
    score : 87,
    strengths : "Slopes of lines",
		weaknesses : "Horizontal and Vertical Lines",
		categories: ["Slopes of Lines", "Equations of Lines",
		"Horizontal and Vertical Lines", "Tangent Lines" ],
		scores: [19, 17, 3, 5],
		title: "PreCalculus Chapter 1-4"
  }
)

reportCollection.insert(
	{
    reportid :2,
    userid: 1,
    questionBankID : 102,
    score : 65,
    strengths : "Newton's Laws of Motion",
		weaknesses : "Fluid Dynamics",
		categories: ["Newton's Laws of Motion",
		"Fluid Dynamics", "Circular Motion", "One Dimensional Kinematics"],
		scores: [20, 2, 10, 13],
		title: "Physics Chapters 1-6"
  }
)
// END: Reports

// BEGIN: Question Banks
db.createCollection('questionBanks')
questionBanksCollection = db.getCollection("questionBanks")
questionBanksCollection.remove({})
questionBanksCollection.insert(
      {
            questionBankID: 101,
            questionBankName: "Mathematics",
            status: "Published",
            createdDate: "05/07/2019",
            lastmodifiedDate: "05/08/2019",
            createdBy: "Prof. A",
            updatedBy: "Prof. H",
            keyConcepts: "Precalculas I",
            numberOfQuestions: 50,
            duration: 60

      }
)
questionBanksCollection.insert(
      {
            questionBankID: 102,
            questionBankName: "Physics",
            status: "Not Published",
            createdDate: "04/07/2019",
            lastmodifiedDate: "04/08/2019",
            createdBy: "Prof. H",
            updatedBy: "Prof. H",
            keyConcepts: "Physics I",
            numberOfQuestions: 50,
            duration: 60

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
		questionBankName : "Mathematics",
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
		questionBankName : "Mathematics",
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
		questionBankName : "Physics",
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
		questionBankName : "Physics",
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
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1031,
    questionText : "Trunk of tree increases in grith due to cell division in which tissue?",
    category : "Non-human Life",
  	options :
			[
				"Epithelial tissue",
				"Meristematic tissue",
				"Connective tissue",
				"Skeletal tissue"
			],
    answer : "Meristematic tissue"
  }
)

questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1032,
    questionText : "Which tissue in cells have lost the capicity of cell division?",
    category : "Anatomy and Physiology",
  	options :
			[
				"Epithelial tissue",
				"Meristematic tissue",
				"Permanent tissue",
				"Temporary tissue"
			],
    answer : "Permanent tissue"
  }
)

questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1033,
    questionText : "Which scientist studied about wheat rust problem?",
    category : "History",
  	options :
			[
				"Jane Goodall",
				"William Perkin",
				"Howard Florey",
				"K. C. Mehta"
			],
    answer : "K. C. Mehta"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1034,
    questionText : "Most of the plants obtain nitrogen from the soil in which from? – Nitrates",
    category : "Non-human Life",
  	options :
			[
				"Nitrates",
				"Phthalates",
				"Nitrites",
				"Sulfates"
			],
    answer : "Nitrates"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1035,
    questionText : "Which fungus is responsible for disease late blight of potato?",
    category : "Non-human Life",
  	options :
			[
				"Amanita arocheae",
				"Claviceps purpurea",
				"Lepiota helveola",
				"Phytophthora infestans"
			],
    answer : "Phytophthora infestans"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1036,
    questionText : "Which is responsible for red rot of sugarcane?",
    category : "Non-human Life",
  	options :
			[
				"Epithelial tissue",
				"Collectorichum falcatum",
				"The force",
				"Phytophthora infestans"
			],
    answer : "Collectorichum falcatum"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1037,
    questionText : "Which stage of development of insect is most harmful for crop?",
    category : "Non-human Life",
  	options :
			[
				"Caterpillar",
				"Cocoon",
				"Buterfly",
				"Deceased"
			],
    answer : "Caterpillar"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1038,
    questionText : "In India famous Bengal famine accurred in 1942 by which disease?",
    category : "History",
  	options :
			[
				"Tuberculosis",
				"Small pox",
				"The plague",
				"Leaf spot of rice"
			],
    answer : "Leaf spot of rice"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 1039,
    questionText : "What is treatment of body defects through massage and exercise?",
    category : "Fields of Study",
  	options :
			[
				"Physiotherapy",
				"Cryotherapy",
				"Cardiotherapy",
				"Behavioral therapy"
			],
    answer : "Physiotherapy"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10310,
    questionText : "What is Study of growth and development of embryo? – Embryology",
    category : "Fields of Study",
  	options :
			[
				"Etymology",
				"Physiology",
				"Cartography",
				"Embryology"
			],
    answer : "Embryology"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10311,
    questionText : "Which branch of biology is concerned with study and function of internal organ of organism?",
    category : "Fields of Study",
  	options :
			[
				"Anatomy",
				"Physiology",
				"Neurology",
				"Oncology"
			],
    answer : "Physiology"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10312,
    questionText : "Which branch of science deal with the study of causative agent of disease?",
    category : "Fields of Study",
  	options :
			[
				"Etiology",
				"Etymology",
				"Virology",
				"Causotology"
			],
    answer : "Etiology"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10313,
    questionText : "What is the Study of pulse and arterial blood pressure called?",
    category : "Fields of Study",
  	options :
			[
				"Cardiology",
				"Zoology",
				"Sphygmology",
				"Tautology"
			],
    answer : "Sphygmology"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10314,
    questionText : "Which substance found in blood which helps in cloting? – Fibrinogen",
    category : "Anatomy and Physiology",
  	options :
			[
				"Collagen",
				"Elastin",
				"Fibrinogen",
				"Cytokines"
			],
    answer : "Fibrinogen"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10315,
    questionText : "Which organs has its own wave of autonomic excitation? – Heart",
    category : "Anatomy and Physiology",
  	options :
			[
				"Brain",
				"Heart",
				"Ocularis",
				"Trapezius"
			],
    answer : "Heart"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10316,
    questionText : "What is the short upper part of the human intetine next to the stomach?",
    category : "Anatomy and Physiology",
  	options :
			[
				"Duodenum",
				"Atrium",
				"Rectum",
				"Cochlea"
			],
    answer : "Duodenum"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10317,
    questionText : "In the retina of eye cells what is present for colour differentiation?",
    category : "Anatomy and Physiology",
  	options :
			[
				"Spirals",
				"Cones",
				"Rods",
				"Circles"
			],
    answer : "Cones"
  }
)
questionsCollection.insert(
	{
		questionBankID : 103,
		questionBankName : "Biology",
		questionID : 10318,
		questionText : "The massive hold in the ozone layer over Antarctica was first discovered in which year?",
		category : "History",
		options :
		[
			"1994",
			"1985",
			"1978",
			"2001"
		],
		answer : "1985"
	}
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10319,
    questionText : "Who published the book ‘Origin of species by natural selection in 1859’?",
    category : "History",
  	options :
			[
				"Charles Darwin",
				"Gregor Mendel",
				"James Watson",
				"Joshua Lederberg"
			],
    answer : "Charles Darwin"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10320,
    questionText : "Who discovered the causal organism of the disease Anthrax?",
    category : "History",
  	options :
			[
				"James Parkinson",
				"Joseph Lister",
				"Robert Koch",
				"Sir David Bruce"
			],
    answer : "Robert Koch"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10321,
    questionText : "Which organelles in the cell, other than nucleus contains DNA?",
    category : "Genetics",
  	options :
			[
				"Mitochondria",
				"Ribosome",
				"Lysosome",
				"Endoplasmic Reticulum"
			],
    answer : "Mitochondria"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10322,
    questionText : "Trisomy 21 is usually the resulf of an extra chromosome ___, so that each body cell has a total of 47 chromosomes.",
    category : "Genetics",
  	options :
			[
				"18",
				"19",
				"20",
				"21"
			],
    answer : "21"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10323,
    questionText : "A gene showing codominance...",
    category : "Genetics",
  	options :
			[
				"has one allele dominant to the other",
				"has alleles tightly linked on the same chromosome",
				"has both alleles independently expressed in the heterozygote",
				"has alleles expressed at the same time in development"
			],
    answer : "has both alleles independently expressed in the heterozygote"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10324,
    questionText : "Which of the following is not a property of the genetic code?",
    category : "Genetics",
  	options :
			[
				"Non overlapping",
				"Almost universal",
				"Four stop codons",
				"Redundant"
			],
    answer : "Four stop codons"
  }
)
questionsCollection.insert(
  {
		questionBankID : 103,
		questionBankName : "Biology",
    questionID : 10325,
    questionText : "In DNA, adenine normally pairs with...",
    category : "Genetics",
  	options :
			[
				"Cytosine",
				"Guanine",
				"Thymine",
				"Uracil"
			],
    answer : "Thymine"
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
		testTakerID : 2,
		questionBankID : 102,
		questionID : 1021,
	 	orderOfQuestionInTest : 1,
		category : "Biology",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 3,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 101,
		questionID : 1021,
	 	orderOfQuestionInTest : 1,
		category : "Inheritance",
		isCorrect : 1
	}
)

testCollection.insert(
	{
		testID : 3,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 1021,
	 	orderOfQuestionInTest : 1,
		category : "Genetics",
		isCorrect : 0
	}
)

testCollection.insert(
	{
		testID : 3,
		questionBankCreatorID : 1,
		testTakerID : 2,
		questionBankID : 102,
		questionID : 1021,
	 	orderOfQuestionInTest : 1,
		category : "Mitosis",
		isCorrect : 1
	}
)
// END: Test
