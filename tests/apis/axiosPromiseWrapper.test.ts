import { AxiosError } from 'axios'

import { request } from '@/apis/request'

/**
 * @group framework
 */
describe('API lib: \'request\'', () => {
  it('# must return complete axios response on success', async () => {
    const responseNominal = await request({
      method: 'get',
      url: 'https://reqres.in/api/users/2'
    })
    expect(responseNominal.status).toBe(200)
    expect(responseNominal.data).toStrictEqual({
      data: {
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
        email: 'janet.weaver@reqres.in',
        // eslint-disable-next-line camelcase
        first_name: 'Janet',
        id: 2,
        // eslint-disable-next-line camelcase
        last_name: 'Weaver'
      },
      support: {
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
        url: 'https://reqres.in/#support-heading'
      }
    })
  })
  it('# must not throw when response status is not 404', async () => {
    const response400 = await request({
      method: 'get',
      url: 'https://reqres.in/api/users/23'
    })
    expect(response400.status).toBe(404)
    expect(response400.data).toBeDefined()
  })
  it('# must send given payload on post request', async () => {
    const response201 = await request({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      payload: {
        job: 'leader',
        name: 'morpheus'
      },
      url: 'https://reqres.in/api/users'
    })
    expect(response201.status).toBe(201)
    expect(response201.data).toStrictEqual(expect.objectContaining({
      createdAt: expect.any(String),
      id: expect.any(String),
      job: 'leader',
      name: 'morpheus'
    }))
  })
  it('# must send given payload on put request', async () => {
    const response200 = await request({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      payload: {
        job: 'zion resident',
        name: 'morpheus'
      },
      url: 'https://reqres.in/api/users/2'
    })
    expect(response200.status).toBe(200)
    expect(response200.data).toStrictEqual(expect.objectContaining({
      job: 'zion resident',
      name: 'morpheus',
      updatedAt: expect.any(String)
    }))
  })
  it('# must send given payload on patch request', async () => {
    const response200 = await request({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'patch',
      payload: {
        job: 'zion resident',
        name: 'morpheus'
      },
      url: 'https://reqres.in/api/users/2'
    })
    expect(response200.status).toBe(200)
    expect(response200.data).toStrictEqual(expect.objectContaining({
      job: 'zion resident',
      name: 'morpheus',
      updatedAt: expect.any(String)
    }))
  })
  it('# must be able to send delete requests', async () => {
    const response204 = await request({
      method: 'delete',
      url: 'https://reqres.in/api/users/2'
    })
    expect(response204.status).toBe(204)
  })
  it('# must not fail on delayed response', async () => {
    const delayedResponse = await request({
      method: 'get',
      url: 'https://reqres.in/api/users/3?delay=3'
    })
    expect(delayedResponse.status).toBe(200)
  })
  it('# must throw on network error', async () => {
    try {
      await request({
        method: 'get',
        url: 'http://notfound.eu/foo/bar'
      })
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('should not pass')
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toBeInstanceOf(AxiosError)
    }
  })
})
