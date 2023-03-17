const axios = require("axios");
jest.mock("axios");
describe("mock api calls", () => {
  test('API call test', () => {
    //arrange

    const mockedResponse = {
      data: {
        title: "test-user",
        specialty: "Hip"
      }
    }
    axios.get.mockResolvedValue(mockedResponse);
    const helper = require('./helpers.js');
    //act
    helper.getJSON()
    //asserts
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith("https://gc-interview.azurewebsites.net/api/consultantlisting")
  })
})