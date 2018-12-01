/**
 * Created by lendierickx on 19/09/18.
 */
'use strict'

class Vector {
  constructor (...values) {
    [this.dimensions, this.data = []] = values
    if (this.data.length === 0) {
      this.data = Array.apply(null, Array(this.dimensions))
    } else {
      this.dimensions = this.data.length
    }
  }

  map (fun) {
    this.data = this.data.map(fun)
    return this
  }

  isParallel (vector) {
    if (this.dimensions !== vector.dimensions) {
      throw new Error('Dimensions are not the same')
    }
    return this.data
      .map((x, i) => x / vector.data[i])
      .every((el, idx, arr) => arr[0] === el)
  }

  isPerpendicular (vector) {
    return Vector.dot(this, vector) === 0
  }

  static dot (x, y) {
    if (x.dimensions !== y.dimensions) {
      throw new Error('Dimensions are not the same')
    }
    return x.data.map((el, i) => {
      return el * y.data[i]
    }).reduce((prev, next) => {
      return (prev += next)
    }, 0)
  }

  dot (vector) {
    if (this.dimensions !== vector.dimensions) {
      throw new Error('Dimensions are not the same')
    }
    return this.map((x, i) => {
      return x * vector.data[i]
    }).data.reduce((prev, next) => {
      return (prev += next)
    }, 0)
  }

  norm () {
    return Math.sqrt(this.data.map(x => {
      return x * x
    }).reduce((prev, next) => {
      return (prev += next)
    }, 0))
  }

  distance (vector) {
    let m = Vector.minus(this, vector)
    return Math.sqrt(m.sqr())
  }

  projection (vector) {
    let ab = Vector.dot(this, vector)
    let bb = Vector.dot(vector, vector)
    return ab / bb
  }

  cos (vector) {
    let ab = Vector.dot(this, vector)
    let a_magnitude = this.norm()
    let b_magnitude = vector.norm()
    return ab / (a_magnitude * b_magnitude)
  }

  sqr () {
    return this.dot(this)
  }

  zeros () {
    this.map(x => 0)
  }

  ones () {
    this.map(x => 1)
  }

  static add (x, y) {
    const res = x.data.map((el, i) => el + y.data[i])
    return new Vector(res.length, res)
  }

  add (vector) {
    return this.map((x, i) => x + vector.data[i])
  }

  static minus (x, y) {
    const res = x.data.map((el, i) => el - y.data[i])
    return new Vector(res.length, res)
  }

  minus (vector) {
    return this.map((x, i) => x - vector.data[i])
  }
}
