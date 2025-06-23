// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title TipJar - Un contrato para recibir propinas con mensajes personalizados
/// @author Maria Jose Atencio
/// @notice Permite a cualquier usuario enviar propinas en ETH junto con un mensaje. Solo el owner puede retirar los fondos.
contract TipJar {
    // Dirección del owner del contrato (quien despliega el contrato)
    address public owner;

    // Evento emitido cada vez que se recibe una propina
    event NewTip(address indexed from, uint amount, string message);

    // Struct opcional (bonus) para guardar más detalles de las propinas
    struct Tip {
        address from;
        uint amount;
        string message;
        uint timestamp;
    }

    // Array opcional que guarda todas las propinas
    Tip[] public tips;

    // Constructor: se ejecuta una vez al desplegar el contrato
    constructor() {
        owner = msg.sender; // El que despliega el contrato se guarda como owner
    }

    /// @notice Función para enviar una propina al contrato
    /// @param message Mensaje personalizado que acompaña la propina
    function tip(string memory message) public payable {
        require(msg.value > 0, "La propina debe ser mayor a 0");

        // Guardar la propina en el array (bonus)
        tips.push(Tip({
            from: msg.sender,
            amount: msg.value,
            message: message,
            timestamp: block.timestamp
        }));

        // Emitir el evento para que los frontends puedan escucharlo
        emit NewTip(msg.sender, msg.value, message);
    }

    /// @notice Función para retirar todos los fondos acumulados
    /// Solo el owner puede ejecutarla
    function withdraw() public {
        require(msg.sender == owner, "Solo el owner puede retirar");
        payable(owner).transfer(address(this).balance);
    }

    /// @notice Función opcional para consultar el número total de propinas
    function getTotalTips() public view returns (uint) {
        return tips.length;
    }
}
