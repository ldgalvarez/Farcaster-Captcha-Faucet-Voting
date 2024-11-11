const VotingSystem = artifacts.require("VotingSystem");

contract("VotingSystem", accounts => {
  it("debería crear una encuesta", async () => {
    const instance = await VotingSystem.deployed();
    await instance.createPoll("¿Cuál es tu color favorito?", ["Rojo", "Azul", "Verde"], { from: accounts[0] });
    const poll = await instance.polls(0);
    assert.equal(poll.question, "¿Cuál es tu color favorito?", "La encuesta no se creó correctamente");
  });

  it("debería permitir votar", async () => {
    const instance = await VotingSystem.deployed();
    await instance.vote(0, 1, { from: accounts[1] });
    const results = await instance.getPoll(0);
    assert.equal(results[2][1], 1, "El voto no se registró correctamente");
  });
});
