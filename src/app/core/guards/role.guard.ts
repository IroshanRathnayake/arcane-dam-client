import { CanDeactivateFn } from '@angular/router';

export const roleGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
