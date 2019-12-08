import * as actionTypes from "./actionTypes";
import * as actions from "./auth";
import { mockWindowProperty } from "../../shared/utility";

describe("auth actions", () => {
  it("should create an action to start authentication", () => {
    const expectedAction = { type: actionTypes.AUTH_START };
    expect(actions.authStart()).toEqual(expectedAction);
  });

  it("should create an action to report error during authentication", () => {
    const expectedAction = {
      type: actionTypes.AUTH_FAIL,
      error: "some error"
    };
    expect(actions.authFail("some error")).toEqual(
      expectedAction
    );
  });

  describe("logout action creator", () => {
    describe("from localStorage", () => {
      mockWindowProperty("localStorage", {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      });
      let spy;
      beforeAll(() => {
        actions.logout();
        spy = window.localStorage.removeItem;
      });
      it("should remove token from localStorage", () => {
        expect(spy).toBeCalledWith("token");
      });
      it("should remove expirationDate from localStorage", () => {
        expect(spy).toBeCalledWith("expirationDate");
      });
      it("should remove userId from localStorage", () => {
        expect(spy).toBeCalledWith("userId");
      });
    });
    it("should create an action to log out user", () => {
      const expectedAction = {
        type: actionTypes.AUTH_LOGOUT
      };
      expect(actions.logout()).toEqual(expectedAction);
    });
  });
});
