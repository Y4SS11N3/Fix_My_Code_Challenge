#!/usr/bin/python3

class Square:

    def __init__(self, side_length):
        self.side_length = side_length

    def area(self):
        """ Area of the square """
        return self.side_length ** 2

    def perimeter(self):
        return 4 * self.side_length

    def __str__(self):
        return f"Square with side length {self.side_length}"


if __name__ == "__main__":

    s = Square(12)
    print(s)
    print(s.area())
    print(s.perimeter())
