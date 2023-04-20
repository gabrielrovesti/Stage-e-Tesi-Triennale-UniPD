// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ZKP.sol";

contract ExampleUsage {
    function runExample() public {
        ZKP.ZKPParameters memory params = ZKP.ZKPParameters({
            p: 21888242871839275222246405745257275088548364400416034343698204186575808495617,
            a: 0,
            b: 3,
            Gx: 1,
            Gy: 2,
            n: 21888242871839275222246405745257275088597270413166387531887782885972891924521,
            h: 1
        });

        ZKP.CircuitDefinition memory circuit = ZKP.CircuitDefinition({
            numInputs: 2,
            numOutputs: 1,
            numWires: 4,
            gates: new ZKP.Gate[](3)
        });

        circuit.gates[0] = ZKP.Gate({
            gateType: ZKP.GateType.And,
            inputWires: new uint256[](2),
            outputWire: 2
        });

        circuit.gates[1] = ZKP.Gate({
            gateType: ZKP.GateType.Or,
            inputWires: new uint256[](2),
            outputWire: 3
        });

        circuit.gates[2] = ZKP.Gate({
            gateType: ZKP.GateType.And,
            inputWires: new uint256[](2),
            outputWire: 4
        });

        circuit.gates[0].inputWires[0] = 0;
        circuit.gates[0].inputWires[1] = 1;
        circuit.gates[1].inputWires[0] = 2;
        circuit.gates[1].inputWires[1] = 3;
        circuit.gates[2].inputWires[0] = 2;
        circuit.gates[2].inputWires[1] = 3;

        uint256[] memory inputs = new uint256[](2);
        inputs[0] = 1;
        inputs[1] = 0;

        uint256[] memory outputs = new uint256[](1);
        outputs[0] = 1;

        ZKP.Prover.Proof memory proof = ZKP.Prover.generateProof(inputs, params, circuit);
        bool result = ZKP.Verifier.verifyProof(proof, params, circuit, outputs);

        require(result, "Proof verification failed");
    }
}
