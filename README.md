1. Initial project

    ```bash
    npm init
    ```

2. Install hardhat
	
	```bash
	npm install --save-dev hardhat
	```
	
3. Create hardhat project

	```bash
	npx hardhat
	```

4. Install dependencies

    ```bash
    npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @openzeppelin/hardhat-upgrades
    ```

5. Configure Hardhat to use the nomiclabs/hardhat-ethers and @openzeppelin/hardhat-upgrades

    ```js
    // hardhat.config.js
    require("@nomiclabs/hardhat-ethers");
    require("@openzeppelin/hardhat-upgrades");
    ```

6. Add create contract script

    ```js
    // scripts/create-script.js
    const { ethers, upgrades } = require("hardhat")

    async function main() {
        const Foo = await ethers.getContractFactory("Foo")
        const foo = await upgrades.deployProxy(Foo)

        // For initial value, execute function "add" with args "[100]"
        // const foo = await upgrades.deployProxy(Foo, [100], {initializer: "add"})

        await foo.deployed()
    }
    
    main()
    ```

7. Add update contract script

    ```js
    // scripts/update-script.js
    const { ethers, upgrades } = require("hardhat");

    async function main() {
        const FooV2 = await ethers.getContractFactory("FooV2");
        const fooV2 = await upgrades.upgradeProxy(process.env.PROXY_ADDRESS, FooV2)
    }

    main()
    ```

8. Write Foo contract

    ```sol
    // contracts/Foo.sol
    contract Foo {

        uint256 private number;

        function add(uint256 n) public {
            number += n;
        }

        function retrieve() view public returns(uint256) {
            return number;
        }
    }
    ```

9. Write Foo2 contract

    ```sol
    // contracts/FooV2.sol
    contract FooV2 {

        uint256 private number;

        function add(uint256 n) public {
            number += n;
        }

        function minus(uint256 n) public {
            number -= n;
        }

        function retrieve() view public returns(uint256) {
            return number;
        }
    }
    ```

10. Add network and private key

    ```js
    // hardhat.config.js
    const LOCAL_RPC_URL = process.env.LOCAL_RPC_URL
    const PRIVATE_KEY = process.env.PRIVATE_KEY
    module.exports = {
        solidity: "0.8.4",
        defaultNetwork: "local",
        networks: {
            local: {
                url: LOCAL_RPC_URL,
                accounts: [PRIVATE_KEY]
            }
        }
    };
    ```

11. Install and run ganache-cli for local test

    ```bash
    npm install -g ganache-cli
    ganache-cli
    ```

12. Export env

    ```bash
    export LOCAL_RPC_URL=http://127.0.0.1:8545
    export PRIVATE_KEY=0xbd5d9c5e000dc1b03bb69bc0f6a9d69600efa53d7ae81f7739cfed2d1ed11e59
    ```

13. Deploy contract

    ```bash
    npx hardhat run scripts/create-script.js
    ```

14. Export proxy address

    ```
    export PROXY_ADDRESS=0x0A5C2008bbf4dD1C8E1Df6f712091b2984BB6183
    ```

15. Attach contract and check content

    ```bash
    npx hardhat console --network local

    const Foo = await ethers.getContractFactory("Foo")
    const foo = Foo.attach(process.env.PROXY_ADDRESS)
    (await foo.retrieve()).toString()
    ```

16. Upgrade contract

    ```bash
    npx hardhat run scripts/update-script.js
    ```

17. Check V2 function

    ```bash
    npx hardhat console --network local

    const FooV2 = await ethers.getContractFactory("FooV2")
    const fooV2 = FooV2.attach(process.env.PROXY_ADDRESS)
    (await fooV2.retrieve()).toString()
    await fooV2.minus(10)
    (await fooV2.retrieve()).toString()
    ```


> https://hardhat.org/guides/project-setup.html  
> https://docs.openzeppelin.com/upgrades-plugins/1.x/  
> https://github.com/trufflesuite/ganache