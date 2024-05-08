//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PropertySale {
     struct Home {
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

    function addHome(string memory _title, string memory _description, uint _budget, string memory _addresss, string memory _ownerName) public {
        require(msg.sender != address(0), "Only non-zero addresses can add homes");
        homeCount++;
        homes[homeCount] = Home(_title, _description, _budget, _addresss, false, msg.sender, _ownerName);
    }

    function getHome(uint _homeId) public view returns (string memory, string memory, uint, string memory, bool, address, string memory) {
        return (homes[_homeId].title, homes[_homeId].description, homes[_homeId].budget, homes[_homeId].addresss, homes[_homeId].isSold, homes[_homeId].owner, homes[_homeId].ownerName);
    }

    function buyHome(uint256 _homeId, address _buyerAddress, string memory _buyerName) public payable {
        require(_buyerAddress != address(0), "Invalid buyer address");
        require(homes[_homeId].isSold == false, "Home is already sold");
        require(msg.value >= homes[_homeId].budget, "Insufficient funds");

        // Retrieve the owner's wallet address
        address payable ownerAddress = payable(homes[_homeId].owner);

        // Transfer funds to the owner of the house
        ownerAddress.transfer(homes[_homeId].budget);

        // Update the owner's name
        homes[_homeId].ownerName = _buyerName;

        // Update the owner's address
        homes[_homeId].owner = _buyerAddress;

        // Mark the home as sold
        homes[_homeId].isSold = true;
    }

    function getAllHomeIds() public view returns (uint[] memory) {
        uint[] memory homeIds = new uint[](homeCount);
        for (uint i = 1; i <= homeCount; i++) {
            homeIds[i - 1] = i;
        }
        return homeIds;
    }    
}
