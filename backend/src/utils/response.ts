import log from './log';

const ENV = (process.env.NODE_ENV || 'dev').toLowerCase();

export const MOCK_RESULT = (parent, args, context, info): any => ({
  config : {},
  data   : {
    edges : {
      args : (): string => {
        try {
          return JSON.stringify(args);
        } catch (e) {
          log.error(e);
          return '';
        }
      },
      context : (): string => {
        try {
          return JSON.stringify(context);
        } catch (e) {
          log.error(e);
          return '';
        }
      },
      info : (): string => {
        try {
          return JSON.stringify(info);
        } catch (e) {
          log.error(e);
          return '';
        }
      },
      parent : (): string => {
        try {
          return JSON.stringify(parent);
        } catch (e) {
          log.error(e);
          return '';
        }
      },
    },
    message  : `Server has been started, with stage ${ENV}.`,
    pageInfo : {
      hasNextPage : false,
      hasPrevPage : false,
      nextCursor  : '',
      prevCursor  : '',
    },
    totalCount : 0,
  },
  headers    : {},
  status     : 200,
  statusText : '200',
});

export default '';
