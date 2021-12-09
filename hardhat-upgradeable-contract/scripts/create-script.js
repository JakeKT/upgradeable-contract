const { ethers, upgrades } = require("hardhat")

async function main() {
  const Foo = await ethers.getContractFactory("Foo")
  console.log("Deploying proxy...")
  const foo = await upgrades.deployProxy(Foo, [100], {initializer: "add"})
  await foo.deployed()
  console.log("Foo deployed to:", foo.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })