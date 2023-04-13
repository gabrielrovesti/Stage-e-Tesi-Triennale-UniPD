const IdentityManagement = artifacts.require("./IdentityManagement.sol");

module.exports = function (deployer) {
	// Le pasamos a `deploy` el contrato que queremos desplegar
	// además de los parámetros del constructor
	deployer.deploy(IdentityManagement);
};

