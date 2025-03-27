const StudentLoan= artifacts.require("StudentLoan");

module.exports = function (deployer) {
    deployer.deploy(StudentLoan);
};
