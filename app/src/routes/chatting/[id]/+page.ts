import { load_FindIdMessage } from "$houdini";

export const load = async (event) => {
  const variables = {
    id: event.params.id
  };
  return {
    ...await load_FindIdMessage({ event, variables }),
    channelId: event.params.id
  }
}