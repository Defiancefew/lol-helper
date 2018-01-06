import { createLogger } from 'redux-logger';

export const logger = createLogger({
  level: 'info',
  collapsed: true,
  colors: {
    title: ({ type }: { type: string }) => {
      if (type.endsWith('SUCCESS')) {
        return 'Chartreuse ';
      }

      if (type.endsWith('FAILURE')) {
        return 'Crimson ';
      }

      return 'inherit';
    },
  },
});
