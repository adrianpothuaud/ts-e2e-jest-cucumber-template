/**
 * @group sample
 */
import { request } from '@/apis/request'

describe('E2E Sample Tests: ReqRes demo API (https://reqres.in)', () => {
  it('* list users -> 200', async () => {
    const response = await request({
      method: 'get',
      url: 'https://reqres.in/api/users?page=2'
    })

    expect(response.status).toBe(200)
  })

  it('* get single user -> 200', async () => {
    const response = await request({
      method: 'get',
      url: 'https://reqres.in/api/users/2'
    })

    expect(response.status).toBe(200)
  })

  it('* get single user -> 404', async () => {
    const response = await request({
      method: 'get',
      url: 'https://reqres.in/api/users/23'
    })

    expect(response.status).toBe(404)
  })
})
