/**
 * Created by lendierickx on 12/09/18.
 */

function predict (row, weights) {
  var activation = weights[0]
  row.forEach(function (x, i) {
    activation += weights[i + 1] * x
  })
  return activation >= 0 ? 1 : 0
}

// # Estimate Perceptron weights using stochastic gradient descent
function train_weights (train, l_rate, n_epoch) {
  var weights = Array.apply(null, Array(train[0].length)).map(x => 0)

  for (i = 0; i < n_epoch; i++) {
    train.forEach(function (x, idx) {
      var expected = x.slice(-1)[0]
      var row = x.slice(0, -1)

      var prediction = predict(row, weights)
      var error = expected - prediction
      row.forEach(function (y, j) {
        weights[j + 1] += l_rate * error * y
      })
    })
  }
  return weights
}

function perceptron (train, test, l_rate, n_epoch) {
  console.log('training')
  var weights = train_weights(train, l_rate, n_epoch)
  console.log('final weights', weights)

  return test.map(function (x, idx) {
    var row = x.slice(0, -1)
    var pred = predict(row, weights)
    return [idx + ': ', pred === x[x.length - 1], pred, x[x.length - 1]]
  })
}
