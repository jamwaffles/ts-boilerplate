export const TEST_AUTH_ACTION = "TEST_AUTH_ACTION";
export const TEST_AUTH_ACTION_IDK = "TEST_AUTH_ACTION_IDK";

export type AuthActions = TestAuthAction | SomeOtherTestAuthAction;

export interface TestAuthAction {
  type: typeof TEST_AUTH_ACTION;
  something: number;
}

export interface SomeOtherTestAuthAction {
  type: typeof TEST_AUTH_ACTION_IDK;
  something: number;
}

export function testAuthAction(something: number): TestAuthAction {
  return {
    type: TEST_AUTH_ACTION,
    something,
  };
}
