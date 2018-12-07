# Learning machine-learning

## Videos

[Neural Networks - The Nature of Code](https://www.youtube.com/watch?v=XJ7HLz9VYz0&list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh "Neural Networks")

Series of videos about neural networks explaining the basics of a perceptron, matrix math and a simple layered neural network.

[MIT Linear algebra video lectures by Gilbert Strang](https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/)

OPen courseware lectures about linear algebra which provides a good start to understand matrix math and helps in understanding most of the math in the papers listed below.

## Papers
1. [Rosenblatt, F. (1958). The perceptron: a probabilistic model for information storage and organization in the brain. Psychological review, 65(6), 386.](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.335.3398&rep=rep1&type=pdf)
2. [Krogh, A., & Hertz, J. A. (1992). A simple weight decay can improve generalization. In Advances in neural information processing systems (pp. 950-957).](http://papers.nips.cc/paper/563-a-simple-weight-decay-can-improve-generalization.pdf)
3. [Ng, A. Y. (2004, July). Feature selection, L 1 vs. L 2 regularization, and rotational invariance. In Proceedings of the twenty-first international conference on Machine learning (p. 78). ACM.](https://icml.cc/Conferences/2004/proceedings/papers/354.pdf)
4. [Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). Imagenet classification with deep convolutional neural networks. In Advances in neural information processing systems (pp. 1097-1105).](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)
5. [Domingos, P. (2012). A few useful things to know about machine learning. Communications of the ACM, 55(10), 78-87.](http://www.centurion.link/w/_media/programming/a_few_useful_things_to_know_about_machine_learning.pdf)
6. [Zeiler, M. D., & Fergus, R. (2014, September). Visualizing and understanding convolutional networks. In European conference on computer vision (pp. 818-833). Springer, Cham.](https://arxiv.org/pdf/1311.2901.pdf)
7. [Coolen, A. C. C. (1998). A beginner’s guide to the mathematics of neural networks. In Concepts for Neural Networks (pp. 13-70). Springer, London.](https://pdfs.semanticscholar.org/280b/ad45331f1bc6ef49d3d6a2c781e00927a2dc.pdf)


## Books

1. [Petersen, K. B., & Pedersen, M. S. (2008). The matrix cookbook. Technical University of Denmark, 7(15), 510.](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)

## Libraries

### Machine learning

#### Perceptron

#### Simple neural network

### Math

#### Vectors.js

Vector library with common mathematical operations such as dot product, distance and norm.

#### Matrix.js

Matrix library with common mathematical operations such as dot product, LU factorization. 

##### Creating a Matrix:

```
new Matrix()
new Matrix(2,3)
new Matrix(2,3,[[-1,2,3],[7,5,-4]])
```

##### Methods

* **fromArray [static]:** returns a Matrix object, array must be an array of arrays.
* **toArray:** returns an array with the matrix data
* **clone:** returns a copy of the current Matrix
* **map(func):** maps over the data of the Matrix using the provided function
* **map(func) [static]**
* **rref:** returns the ROW REDUCED ECHELON FORM of the current Matrix
* **lu:** factors a matrix as the product of a lower triangular matrix and an upper triangular matrix. REturns an array with 2 matricesL and U
* **solve(b):** solves the Ax = b equation. Returns an array x
* **identity:** returns the identity matrix
* **inverse:** returns the inverse matrix if it exists
* **concat:** concatenates 2 matrixes together
* **rank:** returns the rank of dimension of a matrix
* **dimension:** see rank
* **ones:** filles the matrix data with 1 values
* **zeros:** filles the matrix data with 0 values
* **empty:** filles the matrix data with undefined
* **isSymmetric:** returns a Boolean indicating whether the matrix is symmetric
* **isPerpendicular(matrix):** returns a Boolean indicating whether the matrix procided is orthoganal to the curent matrix
* **getCols:** 
* **getRows:** 
* **transpose [static]:** 
* **add:** 
* **subtract:** 
* **dot [static]:** 
* **multiply:** 
* **hadamard:** 
* **additiveinverse:** 
