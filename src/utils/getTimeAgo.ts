import moment from "moment";

export const getTimeAgo = (createdAt: string) => {
  return moment(createdAt).fromNow();
};
