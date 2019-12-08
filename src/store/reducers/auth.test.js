import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should set the error to null and loading to true when authentication starts", () => {
    expect(
      reducer(
        {
          error: "some-error",
          loading: true
        },
        {
          type: actionTypes.AUTH_START
        }
      )
    ).toEqual({
      error: null,
      loading: true
    });
  });

  it("should set the error: action.error, loading: false", () => {
    expect(
      reducer(
        {
          error: null,
          loading: true
        },
        {
          type: actionTypes.AUTH_FAIL,
          error: "some-error"
        }
      )
    ).toEqual({
      error: "some-error",
      loading: false
    });
  });

  it("should store token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id"
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should reset token and userId after logout", () => {
    expect(
      reducer(
        {
          token: "some-token",
          userId: "some-user-id",
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_LOGOUT
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should set authRedirectPath properly", () => {
    expect(
      reducer(
        {
          authRedirectPath: null
        },
        {
          type: actionTypes.SET_AUTH_REDIRECT_PATH,
          path: "proper-path"
        }
      )
    ).toEqual({
      authRedirectPath: "proper-path"
    });
  });
});
