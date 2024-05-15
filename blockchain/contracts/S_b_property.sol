//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PropertySale {
     struct Home {
        uint homeId;
        string title;
        string description;
        uint budget;
        string addresss;
        bool isSold;
        address owner;
        string ownerName;
    }

    mapping (uint => Home) public homes;
    uint public homeCount;

    function addHome(uint256 _homeId, string memory _title, string memory _description, uint _budget, string memory _addresss, string memory _ownerName) public {
        require(msg.sender != address(0), "Only non-zero addresses can add homes");
        homeCount++;
        homes[homeCount] = Home(_homeId, _title, _description, _budget, _addresss, false, msg.sender, _ownerName);
    }

    function getHome(uint _homeId) public view returns (string memory, string memory, uint, string memory, bool, address, string memory) {
        return (homes[_homeId].title, homes[_homeId].description, homes[_homeId].budget, homes[_homeId].addresss, homes[_homeId].isSold, homes[_homeId].owner, homes[_homeId].ownerName);
    }

    function buyHome(uint256 _homeId, string memory _buyerName) public payable {
        // Retrieve all homes
        Home[] memory allHomes = getAllHomes();

        // Iterate through homes to find the one with the matching homeId
        for (uint i = 0; i < allHomes.length; i++) {
            if (allHomes[i].homeId == _homeId) {
                // Check if the home is not already sold
                require(allHomes[i].isSold == false, "Home is already sold");

                // Check if the buyer has sent enough funds to purchase the home
                require(msg.value >= allHomes[i].budget, "Insufficient funds");

                // Transfer funds from the buyer to the owner
                payable(allHomes[i].owner).transfer(allHomes[i].budget);

                // Update the owner's name
                allHomes[i].ownerName = _buyerName;

                // Update the owner's address
                allHomes[i].owner = msg.sender;

                // Mark the home as sold
                allHomes[i].isSold = true;

                // Exit loop once the home is found and processed
                break;
            }
        }
    }

    function getAllHomes() public view returns (Home[] memory) {
    Home[] memory allHomes = new Home[](homeCount);
    for (uint i = 1; i <= homeCount; i++) {
        allHomes[i - 1] = homes[i];
    }
    return allHomes;
    }   
}

