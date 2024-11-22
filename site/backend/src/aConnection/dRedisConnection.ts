import Redis from 'ioredis'


const redisClient = new Redis({
  host: 'redis-19203.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
  port: 19203,
  password: 'nRPHDBpR4mmvReRS4xkOlD4dyTxy1l21'
})

const redisConnection = (client: Redis = redisClient) => {
  client.on("error", (error) => {
    console.log('Redis Client Error', error)
  })


  client.on("connect", () => {
    console.log(`Great... Redis connected on server ${client.options.host}`)
  })
}

export default redisConnection;
export { redisClient }
