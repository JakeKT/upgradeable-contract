const { ethers, upgrades } = require("hardhat");

async function main() {
  const FooV2 = await ethers.getContractFactory("FooV2");
  console.log("Updating contract...")
  const fooV2 = await upgrades.upgradeProxy(process.env.PROXY_ADDRESS, FooV2)
  console.log("Foo contract upgraded: ", fooV2.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })