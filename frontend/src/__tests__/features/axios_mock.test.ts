import MockAdapter from 'axios-mock-adapter';
import { client } from 'lib/api/client';

const mockClients = new MockAdapter(client);

mockClients.onDelete("/users/1").reply(200, {
  status: 'delete',
});

test('しっかりレスポンスが帰ってくるか確認',() => {
  client.delete('/users/1').then((response) => {
    console.log(response.data);
  });
});
