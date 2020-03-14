describe("pow", function () {
  before(() => alert("Тестирование началось")); //перед всеми
  after(() => alert("Тестирование закончилось")); //после всех

  beforeEach(() => alert("Перед тестом"));
  afterEach(() => alert("После теста"));

  describe("возводит x в степень 3", function () {
    function makeTest(x) {
      let expected = 1;
      it(`${x} в степени 3 будет ${expected}`, function () {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let i = 0; i <= 5; i++) {
      makeTest(i);
    }

  });

});
