const db = require('./db.js');
// const { validationResult } = require('express-validator');

// Students
exports.studentTests_get = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    let testArr = [];

    // Get live tests only
    db.collection("tests")
    .where('live', '==', true)
    .get()
    .then((querySnapshot) => {
      const resultArr = querySnapshot.docs;

      for (let i = 0; i < resultArr.length; i++) {
        // Pass completed flag alongside full data object
        const allStudentIds = Object.keys(resultArr[i].data().studentsCompleted);
        const completed = allStudentIds.includes(studentId);

        testArr.push({
          [`test${i}`]: resultArr[i].data(),
          completed,
        });
      }
    res.send(testArr);
    })
    .catch(error => {
      console.log('Error fetching test list from db: ', error);
      res.status(404).send();
    });
  } catch (err) {
    console.log('Error in studentTests_get():', err);
    res.status(404).send();
  }
};

exports.test_get = (req, res) => {

}

exports.test_post = (req, res) => {
  // // Handle errors from express-validator
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
}


// Teachers
exports.allTests_get = (req, res) => {

};

exports.setLive_post = (req, res) => {

}

exports.addTest_post = (req, res)=> {

}
