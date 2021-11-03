const { assert } = require("chai");
const { parseEther } = require("ethers/lib/utils");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    //0x001fFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf
    let wallet;
    while (true) {
      wallet = ethers.Wallet.createRandom();
      let w2 = wallet.connect(ethers.provider);

      if (
        BigInt(w2.address) <
        BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf")
      ) {
        const signer1 = ethers.provider.getSigner(0);

        await signer1.sendTransaction({
          to: w2.address,
          value: parseEther("1.0"),
        });

        await game.connect(w2).win();
        break;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
