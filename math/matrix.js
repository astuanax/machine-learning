/**
 * Created by lendierickx on 19/09/18.
 */
'use strict'

class Matrix {
  constructor (...values) {
    [this.rows, this.cols, this.data = []] = values
    if (this.data.length === 0) {
      this.data = Array.apply(null, Array(this.rows)).map(x => Array.apply(null, Array(this.cols)))
    } else {
      this.rows = this.getRows()
      this.cols = this.getCols()
    }
  }

  static fromArray (arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i])
  }

  clone () {
    return new Matrix(this.rows, this.cols, this.data.map(x => x.map(x => x)))
  }

  map (func) {
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j]
        this.data[i][j] = func(val, i, j)
      }
    }
    return this
  }

  rref () {
    let lead = 0
    const resultMatrix = this.clone()

    for (let r = 0; r < this.getRows(); ++r) {
      if (this.getCols() <= lead) {
        return resultMatrix
      }
      let i = r
      while (resultMatrix.data[i][lead] === 0) {
        ++i
        if (this.getRows() === i) {
          i = r
          ++lead
          if (this.getCols() === lead) {
            return resultMatrix
          }
        }
      }

      let tmp = resultMatrix.data[i]
      resultMatrix.data[i] = resultMatrix.data[r]
      resultMatrix.data[r] = tmp

      let val = resultMatrix.data[r][lead]
      for (let j = 0; j < this.getCols(); ++j) {
        resultMatrix.data[r][j] /= val
      }

      for (let i = 0; i < this.getRows(); ++i) {
        if (i === r) continue
        val = resultMatrix.data[i][lead]
        for (let j = 0; j < this.getCols(); ++j) {
          resultMatrix.data[i][j] -= val * resultMatrix.data[r][j]
        }
      }
      lead++
    }
    return resultMatrix
  }

  lu () {
    const n = this.rows
    const tol = 1e-6
    const A = this.clone()
    const L = new Matrix(this.rows, this.cols).zeros()
    const U = new Matrix(this.rows, this.cols).zeros()

    for (let k = 0; k < n; ++k) {
      if (Math.abs(A.data[k][k]) < tol) throw Error('Cannot proceed without a row exchange')
      L.data[k][k] = 1
      for (let i = k + 1; i < n; ++i) {
        L.data[i][k] = A.data[i][k] / A.data[k][k]
        for (let j = k + 1; j < n; ++j) {
          A.data[i][j] = A.data[i][j] - L.data[i][k] * A.data[k][j]
        }
      }
      for (let l = k; l < n; ++l) {
        U.data[k][l] = A.data[k][l]
      }
    }

    return [L, U]
  }

  solve (b) {
    const A = this.clone()
    const LU = A.lu()
    const L = LU[0]
    const U = LU[1]
    const n = this.rows
    let s = 0
    const c = []
    const x = []

    for (let k = 0; k < n; ++k) {
      for (let j = 0; j < k; ++j) {
        s = s + L.data[k][j] * c[j]
      }
      c[k] = b[k] - s
      s = 0
    }
    for (let a = n - 1; a > -1; --a) {
      let t = 0
      for (let b = a + 1; b < n; ++b) {
        t = t + U.data[a][b] * x[b]
      }
      x[a] = (c[a] - t) / U.data[a][a]
    }
    return x
  }

  static map (matrix, func) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => func(matrix.data[i][j], i, j))
  }

  toArray () {
    let arr = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j])
      }
    }
    return arr
  }

  identity () {
    if (this.cols !== this.rows) {
      throw new Error('Matrix is not a square matrix')
    }
    return new Matrix(this.rows, this.cols).map((val, idx, jdx) => {
      return (idx === jdx) * 1
    })
  }

  concat (matrix) {
    this.data = this.data.map((x, idx) => {
      return x.concat(matrix.data[idx])
    })
  }

  rank () {
    const rref = this.rref()
    let result = 0
    for (let i = 0; i < rref.getCols(); ++i) {
      result += rref.data[i][i]
    }
    return result
  }

  dimension () {
    return this.rank()
  }

  zeros () {
    return this.map(x => 0)
  }

  ones () {
    return this.map(x => 1)
  }

  randomize (f = e => Math.random() * 2 - 1) {
    return this.map(f)
    // return this.map(x => Math.floor(Math.random() * 10))
  }

  empty () {
    return this.map(x => undefined)
  }

  isSymmetric () {
    const a = this.data
    const b = Matrix.transpose(this).data
    return !!a && !!b && !(a < b || b < a)
  }

  isPerpendicular (matrix) {
    let a = new Matrix(this.rows, this.cols, this.data)
    let b = matrix
    let c = Matrix.dot(a, b)
    let O = new Matrix(c.rows, c.cols).zeros()
    return !!c && !!O && !(c < O || O < c)
  }

  getDimensions () {
    return this.cols
  }

  getCols () {
    return this.data[0].length
  }

  getRows () {
    return this.data.length
  }

  getShape () {
    return [this.getRows(), this.getCols()]
  }

  transpose () {
    this.data = this.data.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), [])

    return this
  }

  static transpose (matrix) {
    const data = matrix.data.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), [])

    return new Matrix(matrix.getCols(), matrix.getRows(), data)
  }

  add (y) {
    if (y instanceof Matrix) {
      if (this.cols !== y.cols || this.rows !== y.rows) {
        throw new Error('Matrices do not match, cannot add')
      }
      return this.map((val, idx, jdx) => val + y.data[idx][jdx])
    } else {
      return this.map(x => x + y)
    }
  }

  subtract (y) {
    if (y instanceof Matrix) {
      if (this.cols !== y.cols || this.rows !== y.rows) {
        throw new Error('Matrices do not match, cannot add')
      }
      return this.map((val, idx, jdx) => val - y.data[idx][jdx])
    } else {
      return this.map(x => x - y)
    }
  }

  static subtract (x, y) {
    if (y instanceof Matrix) {
      if (x.cols !== y.cols || x.rows !== y.rows) {
        throw new Error('Matrices do not match, cannot subtract')
      }
      return new Matrix(x.rows, x.cols).map((val, idx, jdx) => x.data[idx][jdx] - y.data[idx][jdx])
    }
  }

  static dot (x, y) {
    if (y instanceof Matrix && x instanceof Matrix) {
      if (x.cols !== y.rows) {
        throw new Error('Matrices do not match, cannot multiply')
      }

      return new Matrix(x.rows, y.cols).map((e, i, j) => {
        // Dot product of values in col
        let sum = 0
        for (let k = 0; k < x.cols; k++) {
          sum += x.data[i][k] * y.data[k][j]
        }
        return sum
      })
    }
  }

  hadamard (y) {
    return this.multiply(y)
  }

  additiveinverse () {
    return this.multiply(-1)
  }

  multiply (y) {
    if (y instanceof Matrix) {
      if (this.cols !== y.cols || this.rows !== y.rows) {
        console.log('Use static method \'dot\' to do matrix multiplication')
        throw new Error('Matrices do not match, cannot create hadamard product')
      }
      return this.map((val, i, j) => val * y.data[i][j])
    } else {
      return this.map(x => x * y)
    }
  }
}

module.exports = Matrix

