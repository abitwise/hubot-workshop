'use strict'

const moment = require('moment')
moment.locale('et')

const formatDate = function (dateString) {
  let time = moment(dateString)
  return time.format('DD MMMM HH:mm')
}

function robot (robot) {
  /**
   * Tell random joke with "chucknorris joke"
   */
  robot.respond('/joke/i', res => {
    robot.logger.debug('Fetching joke...')

    return robot.http('https://api.chucknorris.io/jokes/random')
      .get()((err, httpRes, body) => {
        const response = JSON.parse(body)
        const joke = response.value
        robot.logger.debug(`Got joke: "${joke}"`)
        res.send(joke);
      })
  })

  /**
   * List joke categories with "chucknorris list categories"
   */
  robot.respond('/list categories/i', res => {
    robot.logger.debug('Listing categories...')

    return robot.http('https://api.chucknorris.io/jokes/categories')
      .get()((err, httpRes, body) => {
        const response = JSON.parse(body)
        const categories = response.join(', ')
        robot.logger.debug(`Got categories: "${categories}"`)
        res.send(categories);
      })
  })

  /**
   * Tell a joke from specific category with "chucknorris joke <category>"
   */
  robot.respond('/joke (.*)/i', res => {
    const category = res.match[1]
    robot.logger.debug(`Fetching joke from category ${category}`)

    return robot.http(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .get()((err, httpRes, body) => {
        const response = JSON.parse(body)
        const joke = response.value
        robot.logger.debug(`Got ${category} joke: "${joke}"`)
        res.send(joke);
      })
  })
}

module.exports = robot
